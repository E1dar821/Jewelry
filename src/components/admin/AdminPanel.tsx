import React, { useState } from 'react';
import { Save, Upload, Trash2, LogOut, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent, CarouselContent, TextContentState, ContactInfo } from '../../context/ContentContext';
import ImageManager from './ImageManager';

interface TextContentBase {
  text: string;
  description: string;
}

interface LuxuryBrandContent extends TextContentBase {
  subtext: string;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { carousels, textContent, contactInfo, updateCarousels, updateTextContent, updateContactInfo, loading, error } = useContent();
  const [activeTab, setActiveTab] = useState('carousels');
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleImageUpload = (carouselId: string, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newCarousels = carousels.map(carousel => {
          if (carousel.id === carouselId) {
            const newImages = [...carousel.images];
            newImages[index] = reader.result as string;
            return { ...carousel, images: newImages };
          }
          return carousel;
        });
        updateCarousels(newCarousels);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (section: string, field: string, value: string) => {
    const newTextContent = {
      ...textContent,
      [section]: {
        ...textContent[section as keyof TextContentState],
        [field]: value
      }
    };
    updateTextContent(newTextContent);
  };

  const handleCarouselChange = (carouselId: string, field: string, value: string) => {
    const newCarousels = carousels.map(carousel => 
      carousel.id === carouselId 
        ? { ...carousel, [field]: value }
        : carousel
    );
    updateCarousels(newCarousels);
  };

  const handleAddImage = (carouselId: string) => {
    const newCarousels = carousels.map(carousel => {
      if (carousel.id === carouselId) {
        return {
          ...carousel,
          images: [...carousel.images, '/src/assets/images/placeholder.jpg']
        };
      }
      return carousel;
    });
    updateCarousels(newCarousels);
  };

  const handleDeleteImage = (carouselId: string, imageIndex: number) => {
    const newCarousels = carousels.map(carousel => {
      if (carousel.id === carouselId) {
        const newImages = carousel.images.filter((_, index) => index !== imageIndex);
        return {
          ...carousel,
          images: newImages
        };
      }
      return carousel;
    });
    updateCarousels(newCarousels);
  };

  const handleSave = () => {
    // In a real application, you would save this to your backend
    console.log('Changes saved:', { carousels, textContent });
    alert('Changes saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleCarouselUpdate = async (carouselId: string, newImages: string[]) => {
    try {
      const updatedCarousels = carousels.map(carousel => 
        carousel.id === carouselId ? { ...carousel, images: newImages } : carousel
      );
      await updateCarousels(updatedCarousels);
    } catch (err: any) {
      setSaveError('Failed to update carousel images');
      console.error('Error updating carousel:', err);
    }
  };

  const handleTextContentUpdate = async (newTextContent: TextContentState) => {
    try {
      await updateTextContent(newTextContent);
    } catch (err: any) {
      setSaveError('Failed to update text content');
      console.error('Error updating text content:', err);
    }
  };

  const handleContactInfoUpdate = async (newContactInfo: ContactInfo) => {
    try {
      await updateContactInfo(newContactInfo);
    } catch (err: any) {
      setSaveError('Failed to update contact info');
      console.error('Error updating contact info:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gold">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Error Messages */}
        {(error || saveError) && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <div className="flex items-center gap-2 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error || saveError}</span>
            </div>
            {saveError && (
              <button
                onClick={() => setSaveError(null)}
                className="mt-2 text-sm text-gold hover:text-gold/80 underline"
              >
                Dismiss
              </button>
            )}
          </div>
        )}

        <div className="mb-6">
          <div className="border-b border-gold/30">
            <button
              className={`px-4 py-2 mr-4 transition-colors ${
                activeTab === 'carousels'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-gray-400 hover:text-gold'
              }`}
              onClick={() => setActiveTab('carousels')}
            >
              Carousels
            </button>
            <button
              className={`px-4 py-2 mr-4 transition-colors ${
                activeTab === 'text'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-gray-400 hover:text-gold'
              }`}
              onClick={() => setActiveTab('text')}
            >
              Text Content
            </button>
            <button
              className={`px-4 py-2 mr-4 transition-colors ${
                activeTab === 'contacts'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-gray-400 hover:text-gold'
              }`}
              onClick={() => setActiveTab('contacts')}
            >
              Contact Info
            </button>
          </div>
        </div>

        {activeTab === 'carousels' && (
          <div className="space-y-8">
            {carousels.map(carousel => (
              <div key={carousel.id} className="bg-black/50 p-6 rounded-lg border border-gold/20">
                <h2 className="text-xl font-semibold mb-4 text-gold">{carousel.title || carousel.id}</h2>
                <ImageManager
                  carouselId={carousel.id}
                  images={carousel.images}
                  onUpdate={(newImages) => handleCarouselUpdate(carousel.id, newImages)}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'text' && (
          <div className="space-y-6">
            {Object.entries(textContent).map(([key, content]) => (
              <div key={key} className="bg-black/50 p-6 rounded-lg border border-gold/20">
                <h3 className="text-lg font-semibold mb-2 text-gold capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="space-y-4">
                  {Object.entries(content).map(([field, value]) => (
                    <div key={field} className="space-y-2">
                      <label className="block text-sm text-gray-300 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => {
                          const updatedContent = {
                            ...textContent,
                            [key]: {
                              ...textContent[key as keyof TextContentState],
                              [field]: e.target.value
                            }
                          };
                          handleTextContentUpdate(updatedContent as TextContentState);
                        }}
                        className="w-full bg-black/50 border border-gold/20 rounded px-3 py-2 text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div className="bg-black/50 p-6 rounded-lg border border-gold/20">
              <h3 className="text-lg font-semibold mb-4 text-gold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Phone */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={contactInfo.showPhone}
                      onChange={(e) => handleContactInfoUpdate({...contactInfo, showPhone: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-gray-300">Show Phone</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactInfoUpdate({...contactInfo, phone: e.target.value})}
                    placeholder="Phone number"
                    className="w-full bg-black/50 border border-gold/20 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={contactInfo.showEmail}
                      onChange={(e) => handleContactInfoUpdate({...contactInfo, showEmail: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-gray-300">Show Email</span>
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactInfoUpdate({...contactInfo, email: e.target.value})}
                    placeholder="Email address"
                    className="w-full bg-black/50 border border-gold/20 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Instagram */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={contactInfo.showInstagram}
                      onChange={(e) => handleContactInfoUpdate({...contactInfo, showInstagram: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-gray-300">Show Instagram</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo.instagram}
                    onChange={(e) => handleContactInfoUpdate({...contactInfo, instagram: e.target.value})}
                    placeholder="@username or username"
                    className="w-full bg-black/50 border border-gold/20 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Working Hours */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={contactInfo.showWorkingHours}
                      onChange={(e) => handleContactInfoUpdate({...contactInfo, showWorkingHours: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-gray-300">Show Working Hours</span>
                  </label>
                  <textarea
                    value={contactInfo.workingHours}
                    onChange={(e) => handleContactInfoUpdate({...contactInfo, workingHours: e.target.value})}
                    placeholder="Mon-Fri: 9AM-6PM"
                    rows={3}
                    className="w-full bg-black/50 border border-gold/20 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={contactInfo.showAddress}
                      onChange={(e) => handleContactInfoUpdate({...contactInfo, showAddress: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-gray-300">Show Address</span>
                  </label>
                  <textarea
                    value={contactInfo.address}
                    onChange={(e) => handleContactInfoUpdate({...contactInfo, address: e.target.value})}
                    placeholder="Full address"
                    rows={3}
                    className="w-full bg-black/50 border border-gold/20 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 