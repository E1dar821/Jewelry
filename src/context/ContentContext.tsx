import React, { createContext, useContext, useState, useEffect } from 'react';

interface CarouselContent {
  id: string;
  images: string[];
  title?: string;
  description?: string;
}

interface TextContentBase {
  text: string;
  description: string;
}

interface LuxuryBrandContent extends TextContentBase {
  subtext: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  instagram: string;
  workingHours: string;
  showPhone: boolean;
  showEmail: boolean;
  showAddress: boolean;
  showInstagram: boolean;
  showWorkingHours: boolean;
}

interface AboutContent {
  title: string;
  mainText: string;
  qualityTitle: string;
  qualityText: string;
  craftTitle: string;
  craftText: string;
  materialsTitle: string;
  materialsText: string;
  serviceTitle: string;
  serviceText: string;
  motto: string;
}

interface TextContentState {
  mainTitle: TextContentBase;
  quote: TextContentBase;
  brandText: TextContentBase;
  luxuryBrand: LuxuryBrandContent;
}

interface ContentContextType {
  carousels: CarouselContent[];
  textContent: TextContentState;
  contactInfo: ContactInfo;
  aboutContent: AboutContent;
  updateCarousels: (newCarousels: CarouselContent[]) => void;
  updateTextContent: (newTextContent: TextContentState) => void;
  updateContactInfo: (newContactInfo: ContactInfo) => void;
  updateAboutContent: (newAboutContent: AboutContent) => void;
  uploadImage: (file: File) => Promise<string>;
  loading: boolean;
  error: string | null;
}

const defaultCarousels: CarouselContent[] = [
  {
    id: 'model',
    images: [
      '/src/assets/images/model1.jpg'
    ],
    title: 'Model Showcase'
  },
  {
    id: 'luxury',
    images: [
      '/src/assets/images/lux1.png'
    ],
    title: 'Luxury Collection'
  },
  {
    id: 'rings',
    images: [
      '/src/assets/images/ring2.png'
    ],
    title: 'Ring Collection'
  },
  {
    id: 'elegance',
    images: [
      '/src/assets/images/ring3.png'
    ],
    title: 'Eternal Elegance',
    description: 'Where heritage meets modern craftsmanship'
  }
];

const defaultTextContent: TextContentState = {
  mainTitle: {
    text: 'Make ETERNAL BEAUTY FOR YOU',
    description: 'Main hero section title'
  },
  quote: {
    text: 'Defining Perfection, One Exquisite Stone at a Time',
    description: 'Decorative quote'
  },
  brandText: {
    text: 'From us, for you',
    description: 'Top brand text'
  },
  luxuryBrand: {
    text: 'W',
    subtext: 'LUXURY JEWELRY',
    description: 'Luxury branding text'
  }
};

const defaultContactInfo: ContactInfo = {
  phone: '+1 (555) 123-4567',
  email: 'info@wasimjewelry.com',
  address: '123 Luxury Street, Diamond District, New York, NY 10001',
  instagram: '@wasimjewelry',
  workingHours: 'Mon-Sat: 10:00 AM - 8:00 PM\nSun: 12:00 PM - 6:00 PM',
  showPhone: true,
  showEmail: true,
  showAddress: true,
  showInstagram: true,
  showWorkingHours: true
};

const defaultAboutContent: AboutContent = {
  title: 'О нас',
  mainText: 'Мы работаем лучше всего, максимально аккуратно и с особым вниманием к каждой детали. Наши мастера создают уникальные ювелирные изделия, используя только лучшие материалы и проверенные временем техники.',
  qualityTitle: 'Высокое качество',
  qualityText: 'Каждое изделие проходит строгий контроль качества и создается с использованием передовых технологий.',
  craftTitle: 'Мастерство',
  craftText: 'Наши мастера с многолетним опытом создают уникальные произведения искусства, которые станут семейными реликвиями.',
  materialsTitle: 'Лучшие материалы',
  materialsText: 'Используем только драгоценные металлы высшей пробы и натуральные камни с сертификатами качества.',
  serviceTitle: 'Индивидуальный подход',
  serviceText: 'Каждый клиент получает персональное внимание и консультацию для создания идеального украшения.',
  motto: '"Создаем красоту, которая длится вечно"'
};

const API_URL = '/api';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carousels, setCarousels] = useState<CarouselContent[]>(defaultCarousels);
  const [textContent, setTextContent] = useState<TextContentState>(defaultTextContent);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/content`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.carousels && Array.isArray(data.carousels)) {
          setCarousels(data.carousels);
        }
        
        if (data.textContent && typeof data.textContent === 'object') {
          setTextContent(data.textContent);
        }

        if (data.contactInfo && typeof data.contactInfo === 'object') {
          setContactInfo(data.contactInfo);
        }

        if (data.aboutContent && typeof data.aboutContent === 'object') {
          setAboutContent(data.aboutContent);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load content. Using default data.');
        // Keep default data on error
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateCarousels = async (newCarousels: CarouselContent[]) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carousels: newCarousels,
          textContent,
          contactInfo,
          aboutContent
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update local state only after successful server update
      setCarousels(newCarousels);
    } catch (error) {
      console.error('Error updating carousels:', error);
      setError('Failed to update carousels');
      throw error;
    }
  };

  const updateTextContent = async (newTextContent: TextContentState) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carousels,
          textContent: newTextContent,
          contactInfo,
          aboutContent
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update local state only after successful server update
      setTextContent(newTextContent);
    } catch (error) {
      console.error('Error updating text content:', error);
      setError('Failed to update text content');
      throw error;
    }
  };

  const updateContactInfo = async (newContactInfo: ContactInfo) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carousels,
          textContent,
          contactInfo: newContactInfo,
          aboutContent
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update local state only after successful server update
      setContactInfo(newContactInfo);
    } catch (error) {
      console.error('Error updating contact info:', error);
      setError('Failed to update contact info');
      throw error;
    }
  };

  const updateAboutContent = async (newAboutContent: AboutContent) => {
    try {
      setError(null);
      
      const response = await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carousels,
          textContent,
          contactInfo,
          aboutContent: newAboutContent
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Update local state only after successful server update
      setAboutContent(newAboutContent);
    } catch (error) {
      console.error('Error updating about content:', error);
      setError('Failed to update about content');
      throw error;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider 
      value={{ 
        carousels, 
        textContent,
        contactInfo,
        aboutContent,
        updateCarousels, 
        updateTextContent,
        updateContactInfo,
        updateAboutContent,
        uploadImage,
        loading,
        error
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export type { CarouselContent, TextContentState, TextContentBase, LuxuryBrandContent, ContactInfo }; 