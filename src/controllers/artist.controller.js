import Artist from '../models/artist.model.js';

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ hidden: false });
    res.status(200).json({
      status: 'success',
      data: { artists }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    
    if (!artist || artist.hidden) {
      return res.status(404).json({
        status: 'error',
        message: 'Artist not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { artist }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const addArtist = async (req, res) => {
  try {
    const { name, grammy } = req.body;
    const artist = await Artist.create({
      name,
      grammy
    });

    res.status(201).json({
      status: 'success',
      data: { artist }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!artist) {
      return res.status(404).json({
        status: 'error',
        message: 'Artist not found'
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

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    
    if (!artist) {
      return res.status(404).json({
        status: 'error',
        message: 'Artist not found'
      });
    }

    await artist.remove();
    
    res.status(200).json({
      status: 'success',
      message: 'Artist deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};