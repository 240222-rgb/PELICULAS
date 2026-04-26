const genero = require('../models').cam_generos;

module.exports = {
  create(req, res) {
    return genero.create({ nombre: req.body.nombre })
      .then((generoItem) => res.status(201).send(generoItem))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return genero.findAll()
      .then((generos) => res.status(200).send(generos))
      .catch((error) => res.status(400).send(error));
  },

  findById(req, res) {
    return genero.findByPk(req.params.id)
      .then((generoItem) => {
        if (!generoItem) {
          return res.status(404).send({ message: 'Genero no encontrado' });
        }

        return res.status(200).send(generoItem);
      })
      .catch((error) => res.status(400).send(error));
  },

  findByName(req, res) {
    return genero.findAll({ where: { nombre: req.params.nombre } })
      .then((generos) => res.status(200).send(generos))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return genero.update({ nombre: req.body.nombre }, { where: { id: req.params.id } })
      .then(([updatedRows]) => {
        if (updatedRows === 0) {
          return res.status(404).send({ message: 'Genero no encontrado' });
        }

        return res.status(200).send({ message: 'Genero actualizado' });
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return genero.destroy({ where: { id: req.params.id } })
      .then((deletedRows) => {
        if (deletedRows === 0) {
          return res.status(404).send({ message: 'Genero no encontrado' });
        }

        return res.status(200).send({ message: 'Genero eliminado' });
      })
      .catch((error) => res.status(400).send(error));
  },
};
