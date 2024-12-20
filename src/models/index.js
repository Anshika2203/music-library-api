import User from './user.model.js';
import Artist from './artist.model.js';
import Album from './album.model.js';
import Track from './track.model.js';
import Favorite from './favorite.model.js';

// Artist - Album associations
Artist.hasMany(Album, {
  foreignKey: 'artist_id',
  onDelete: 'CASCADE'
});
Album.belongsTo(Artist, {
  foreignKey: 'artist_id'
});

// Album - Track associations
Album.hasMany(Track, {
  foreignKey: 'album_id',
  onDelete: 'CASCADE'
});
Track.belongsTo(Album, {
  foreignKey: 'album_id'
});

// Artist - Track associations
Artist.hasMany(Track, {
  foreignKey: 'artist_id',
  onDelete: 'CASCADE'
});
Track.belongsTo(Artist, {
  foreignKey: 'artist_id'
});

// Favorites associations
User.hasMany(Favorite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Favorite.belongsTo(User, {
  foreignKey: 'user_id'
});

export {
  User,
  Artist,
  Album,
  Track,
  Favorite
};