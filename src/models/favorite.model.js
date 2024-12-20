import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  entityType: {
    type: String,
    enum: ['artist', 'album', 'track'],
    required: true
  }
}, {
  timestamps: true
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;