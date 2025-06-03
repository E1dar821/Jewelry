import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  carousels: [{
    id: String,
    images: [String],
    title: String,
    description: String
  }],
  textContent: {
    mainTitle: {
      text: String,
      description: String
    },
    quote: {
      text: String,
      description: String
    },
    brandText: {
      text: String,
      description: String
    },
    luxuryBrand: {
      text: String,
      subtext: String,
      description: String
    }
  }
}, { timestamps: true });

export const ContentModel = mongoose.model('Content', contentSchema); 