const usuarioController = require('../controller/controller_usuario');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/api/usuarios', authenticateToken, authorizeAdmin, usuarioController.list);
  app.get('/api/usuarios/:id', authenticateToken, usuarioController.findById);
  app.get('/api/usuarios/email/:email', authenticateToken, authorizeAdmin, usuarioController.findByEmail);
  app.post('/api/usuarios', usuarioController.create);
  app.post('/api/users', usuarioController.create);
  app.put('/api/usuarios/:id', authenticateToken, authorizeAdmin, usuarioController.update);
  app.delete('/api/usuarios/:id', authenticateToken, authorizeAdmin, usuarioController.delete);
};
