import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../dist')));

// Health check endpoint for Railway
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Simple file-based storage
const dataFile = path.join(__dirname, '../data.json');

const readData = () => {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading data file:', error);
  }
  
  // Default data
  return {
    carousels: [
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
    ],
    textContent: {
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
    },
    contactInfo: {
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
    }
  };
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
    throw error;
  }
};

// Get content
app.get('/api/content', async (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update content
app.post('/api/content', async (req, res) => {
  try {
    const { carousels, textContent, contactInfo } = req.body;
    const data = { carousels, textContent, contactInfo };
    writeData(data);
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: error.message });
  }
});

// Upload image
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log('Image uploaded:', imageUrl);
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete image
app.delete('/api/images', async (req, res) => {
  try {
    console.log('DELETE /api/images - Request body:', req.body);
    
    const { imageUrl } = req.body;
    if (!imageUrl) {
      console.log('Error: No image URL provided');
      throw new Error('No image URL provided');
    }

    console.log('Processing delete for image:', imageUrl);
    console.log('Image URL type:', typeof imageUrl);
    console.log('Starts with /src/assets/images/:', imageUrl.startsWith('/src/assets/images/'));

    // Check if it's a default asset image (from /src/assets/images/)
    if (imageUrl.startsWith('/src/assets/images/')) {
      console.log('✅ Identified as default asset image - removing from database only');
      return res.json({ message: 'Default image removed from gallery successfully' });
    }

    console.log('Processing as uploaded image...');

    // Handle uploaded images (from /uploads/)
    const filename = imageUrl.startsWith('/uploads/') 
      ? imageUrl.split('/uploads/')[1] 
      : path.basename(imageUrl);

    const filepath = path.join(__dirname, '../uploads', filename);

    console.log('File path:', filepath);

    // Check if file exists and delete it
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      console.log('✅ Uploaded file deleted successfully');
      res.json({ message: 'Image deleted successfully' });
    } else {
      console.log('⚠️ File not found, but removing from database');
      res.json({ message: 'Image removed from gallery successfully' });
    }
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Catch-all handler: send back React's index.html file for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Upload directory:', path.join(__dirname, '../uploads'));
  console.log('Data file:', dataFile);
}); 