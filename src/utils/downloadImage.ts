export interface ImageUrls {
  original: string;
  medium: string;
  thumbnail: string;
}

export type ImageSize = 'small' | 'medium' | 'large';

export const downloadImage = async (urls: ImageUrls, fileName: string, size: ImageSize = 'large') => {
  const getUrl = () => {
    switch (size) {
      case 'small':
        return urls.thumbnail;
      case 'medium':
        return urls.medium;
      case 'large':
        return urls.original;
      default:
        return urls.original;
    }
  };

  try {
    const link = document.createElement('a');
    link.href = getUrl();
    link.download = `${fileName}-${size}.jpg`;
    link.click();
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
};
