const generoController = require('../controller/controller_genero');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/api/generos', generoController.list);
  app.get('/api/generos/:id', generoController.findById);
  app.get('/api/generos/nombre/:nombre', generoController.findByName);
  app.post('/api/generos', authenticateToken, authorizeAdmin, generoController.create);
  app.put('/api/generos/:id', authenticateToken, authorizeAdmin, generoController.update);
  app.delete('/api/generos/:id', authenticateToken, authorizeAdmin, generoController.delete);
};
