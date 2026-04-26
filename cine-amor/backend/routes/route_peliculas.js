const peliculaController = require('../controller/controller_pelicula');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/api/peliculas', peliculaController.list);
  app.get('/api/peliculas/:id', peliculaController.findById);
  app.get('/api/peliculas/titulo/:titulo', peliculaController.findByName);
  app.post('/api/peliculas', authenticateToken, authorizeAdmin, peliculaController.create);
  app.put('/api/peliculas/:id', authenticateToken, authorizeAdmin, peliculaController.update);
  app.delete('/api/peliculas/:id', authenticateToken, authorizeAdmin, peliculaController.delete);
};
