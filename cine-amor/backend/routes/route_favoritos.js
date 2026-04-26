const favoritoController = require('../controller/controller_favorito');
const { authenticateToken } = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/api/favoritos', authenticateToken, favoritoController.list);
  app.get('/api/favoritos/:id', authenticateToken, favoritoController.findById);
  app.post('/api/favoritos', authenticateToken, favoritoController.create);
  app.delete('/api/favoritos/:id', authenticateToken, favoritoController.delete);

  app.post('/api/favoritos/items', authenticateToken, favoritoController.addMovie);
  app.delete('/api/favoritos/:favoriteId/peliculas/:movieId', authenticateToken, favoritoController.removeMovie);
};
