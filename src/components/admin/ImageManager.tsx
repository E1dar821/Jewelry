import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { uploadImage, deleteImage } from '../../services/imageService';

interface ImageManagerProps {
  carouselId: string;
  images: string[];
  onUpdate: (newImages: string[]) => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({ carouselId, images, onUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear previous errors
    setError(null);
    setIsUploading(true);

    try {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit');
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.');
      }

      const imageUrl = await uploadImage(file);
      onUpdate([...images, imageUrl]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      // Clear the input value to allow uploading the same file again
      event.target.value = '';
    }
  };

  const handleDelete = async (imageUrl: string) => {
    setError(null);
    setIsDeleting(imageUrl);

    try {
      await deleteImage(imageUrl);
      const newImages = images.filter(img => img !== imageUrl);
      onUpdate(newImages);
      
      // Show success message based on image type
      if (imageUrl.startsWith('/src/assets/images/')) {
        console.log('Default image removed from gallery');
      } else {
        console.log('Uploaded image deleted');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image. Please try again.');
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className={`relative cursor-pointer ${isUploading ? 'bg-gold/50' : 'bg-gold hover:bg-gold/90'} text-black px-4 py-2 rounded transition-colors`}>
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((imageUrl, index) => {
          const isDefaultImage = imageUrl.startsWith('/src/assets/images/');
          const isUploadedImage = imageUrl.startsWith('/uploads/');
          
          return (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Carousel ${carouselId} image ${index + 1}`}
                className="w-full h-40 object-cover rounded"
              />
              
              {/* Image type indicator */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs text-white ${
                isDefaultImage ? 'bg-blue-500/80' : 'bg-green-500/80'
              }`}>
                {isDefaultImage ? 'Default' : 'Uploaded'}
              </div>
              
              <button
                onClick={() => handleDelete(imageUrl)}
                disabled={isDeleting === imageUrl}
                className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                  isDeleting === imageUrl
                    ? 'bg-red-500/50 cursor-not-allowed opacity-100'
                    : 'bg-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-600'
                }`}
                title={isDefaultImage ? 'Remove from gallery (file will remain)' : 'Delete uploaded file'}
              >
                {isDeleting === imageUrl ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageManager; 