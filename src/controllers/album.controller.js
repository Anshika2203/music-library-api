import Album from '../models/album.model.js';

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ hidden: false })
      .populate('artist', 'name');
    
    res.status(200).json({
      status: 'success',
      data: { albums }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate('artist', 'name');
    
    if (!album || album.hidden) {
      return res.status(404).json({
        status: 'error',
        message: 'Album not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { album }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const addAlbum = async (req, res) => {
  try {
    const { name, year, artist } = req.body;
    const album = await Album.create({
      name,
      year,
      artist
    });

    res.status(201).json({
      status: 'success',
      data: { album }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!album) {
      return res.status(404).json({
        status: 'error',
        message: 'Album not found'
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

export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    
    if (!album) {
      return res.status(404).json({
        status: 'error',
        message: 'Album not found'
      });
    }

    await album.remove();
    
    res.status(200).json({
      status: 'success',
      message: 'Album deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};