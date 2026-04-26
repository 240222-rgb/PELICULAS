const favoritoDetalleController = require('../controller/controller_favorito_detalle');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/api/favorito-detalle', authenticateToken, authorizeAdmin, favoritoDetalleController.list);
  app.get('/api/favorito-detalle/:id', authenticateToken, authorizeAdmin, favoritoDetalleController.findById);
};
