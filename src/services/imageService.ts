import axios from 'axios';

const API_URL = '/api';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to upload image');
    }
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    console.log('Attempting to delete image:', imageUrl);
    
    const response = await axios.delete(`${API_URL}/images`, {
      data: { imageUrl },
    });
    
    console.log('Delete response:', response.status, response.data);
    
    if (response.status !== 200) {
      throw new Error(response.data.message || 'Failed to delete image');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server response:', error.response.status, error.response.data);
      throw new Error(error.response.data.message || 'Failed to delete image');
    }
    throw new Error('Failed to delete image');
  }
}; 