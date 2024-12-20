import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Album = mongoose.model('Album', albumSchema);
export default Album;