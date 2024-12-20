import Favorite from '../models/favorite.model.js';
import Artist from '../models/artist.model.js';
import Album from '../models/album.model.js';
import Track from '../models/track.model.js';

export const getFavorites = async (req, res) => {
  try {
    const { category } = req.params;
    const favorites = await Favorite.find({
      user: req.user._id,
      entityType: category
    }).populate('entityId');

    res.status(200).json({
      status: 'success',
      data: { favorites }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { entityId, entityType } = req.body;
    
    // Verify entity exists
    let entity;
    switch (entityType) {
      case 'artist':
        entity = await Artist.findById(entityId);
        break;
      case 'album':
        entity = await Album.findById(entityId);
        break;
      case 'track':
        entity = await Track.findById(entityId);
        break;
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Invalid entity type'
        });
    }

    if (!entity) {
      return res.status(404).json({
        status: 'error',
        message: 'Entity not found'
      });
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      entityId,
      entityType
    });

    res.status(201).json({
      status: 'success',
      data: { favorite }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!favorite) {
      return res.status(404).json({
        status: 'error',
        message: 'Favorite not found'
      });
    }

    await favorite.remove();
    
    res.status(200).json({
      status: 'success',
      message: 'Favorite removed successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};