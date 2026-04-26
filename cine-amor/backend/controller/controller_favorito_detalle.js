const favoritoDetalle = require('../models').cad_favorito_detalle;

module.exports = {
  list(_, res) {
    return favoritoDetalle.findAll()
      .then((detalles) => res.status(200).send(detalles))
      .catch((error) => res.status(400).send(error));
  },

  findById(req, res) {
    return favoritoDetalle.findByPk(req.params.id)
      .then((detalle) => {
        if (!detalle) {
          return res.status(404).send({ message: 'Detalle no encontrado' });
        }

        return res.status(200).send(detalle);
      })
      .catch((error) => res.status(400).send(error));
  },
};
