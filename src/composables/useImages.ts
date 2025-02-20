import { useImages as useMediaImages } from '@tikotalks/media';
import { ref, computed, reactive } from 'vue';

export interface Image {
  id: string;
  name: string;
  filename: string;
  title: string;
  tags: string[];
  category?: string[];
  description?: string;
  url: {
    original: string;
    thumbnail: string;
    medium: string;
  };
}

export type FilteredImagesResult = {
  type: 'flat';
  data: Image[];
} | {
  type: 'categorized';
  data: [string, Image[]][];
}

export interface FilterState {
  search: string;
  sortBy: 'name' | 'date' | 'category';
  sortOrder: 'asc' | 'desc';
}

const filterState = ref<FilterState>({
  search: '',
  sortBy: 'name',
  sortOrder: 'asc'
});

const groupByCategory = (images: Image[]) => {
  const categories = new Map<string, Image[]>();

  images.forEach(image => {
    if (!image.category || image.category.length === 0) {
      // Handle uncategorized images
      const category = 'Uncategorized';
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)?.push(image);
    } else {
      // Handle images with categories
      image.category.forEach(category => {
        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category)?.push(image);
      });
    }
  });

  return categories;
};

const state = reactive({
  images: [] as Image[],
  loaded: false
});

export const useImages = () => {
  const { findImage, searchImages, getImageUrl } = useMediaImages();

  const loadImages = async () => {
    try {
      state.loaded = false;
      state.images = await searchImages([]);
      state.loaded = true;
    } catch (error) {
      state.loaded = true;
      throw error;
    }
  };

  const filteredImages = computed<FilteredImagesResult>(() => {
    let images = [...state.images];

    // Apply search filter
    if (filterState.value.search) {
      const searchLower = filterState.value.search.toLowerCase();
      images = images.filter(image =>
        image.name.toLowerCase().includes(searchLower) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (filterState.value.sortBy === 'category') {
      const categorizedImages = groupByCategory(images);
      const sortedCategories = Array.from(categorizedImages.entries()).sort((a, b) => {
        const modifier = filterState.value.sortOrder === 'asc' ? 1 : -1;
        return a[0].localeCompare(b[0]) * modifier;
      });

      return { type: 'categorized', data: sortedCategories };
    } else {
      images.sort((a, b) => {
        const aValue = filterState.value.sortBy === 'name' ? a.name : a.id;
        const bValue = filterState.value.sortBy === 'name' ? b.name : b.id;
        const modifier = filterState.value.sortOrder === 'asc' ? 1 : -1;

        return aValue.localeCompare(bValue) * modifier;
      });

      return { type: 'flat', data: images };
    }
  });

  const getAllImages = async () => {
    await loadImages();
    return filteredImages.value;
  };

  const getImageDetails = (id: string) => {
    const image = findImage(id);
    if (!image) return null;

    return {
      ...image,
      url: getImageUrl(id, 'original'),
      thumbnailUrl: getImageUrl(id, 'thumbnail'),
      mediumUrl: getImageUrl(id, 'medium')
    };
  };

  const updateFilters = (newState: Partial<FilterState>) => {
    filterState.value = { ...filterState.value, ...newState };
  };

  return {
    state,
    getAllImages,
    getImageDetails,
    getImageUrl,
    filterState,
    updateFilters,
    filteredImages,
    loading: computed(() => !state.loaded),
  };
};
