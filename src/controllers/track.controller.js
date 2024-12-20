import Track from '../models/track.model.js';

export const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find({ hidden: false })
      .populate('artist', 'name')
      .populate('album', 'name');
    
    res.status(200).json({
      status: 'success',
      data: { tracks }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id)
      .populate('artist', 'name')
      .populate('album', 'name');
    
    if (!track || track.hidden) {
      return res.status(404).json({
        status: 'error',
        message: 'Track not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { track }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const addTrack = async (req, res) => {
  try {
    const track = await Track.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { track }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!track) {
      return res.status(404).json({
        status: 'error',
        message: 'Track not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const deleteTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    
    if (!track) {
      return res.status(404).json({
        status: 'error',
        message: 'Track not found'
      });
    }

    await track.remove();
    
    res.status(200).json({
      status: 'success',
      message: 'Track deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};