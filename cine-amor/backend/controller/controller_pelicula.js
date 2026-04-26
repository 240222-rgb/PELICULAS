const db = require('../models');
const pelicula = db.cam_peliculas;
const genero = db.cam_generos;

module.exports = {
  create(req, res) {
    return pelicula.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      anio: req.body.anio,
      rating: req.body.rating,
      director: req.body.director,
      duracion_minutos: req.body.duracion_minutos,
      imagen: req.body.imagen,
      id_genero: req.body.id_genero,
    })
      .then((peliculaItem) => res.status(201).send(peliculaItem))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return pelicula.findAll({
      include: [{ model: genero, as: 'genero' }],
      order: [['titulo', 'ASC']],
    })
      .then((peliculas) => res.status(200).send(peliculas))
      .catch((error) => res.status(400).send(error));
  },

  findById(req, res) {
    return pelicula.findByPk(req.params.id, {
      include: [{ model: genero, as: 'genero' }],
    })
      .then((peliculaItem) => {
        if (!peliculaItem) {
          return res.status(404).send({ message: 'Pelicula no encontrada' });
        }

        return res.status(200).send(peliculaItem);
      })
      .catch((error) => res.status(400).send(error));
  },

  findByName(req, res) {
    return pelicula.findAll({
      where: { titulo: req.params.titulo },
      include: [{ model: genero, as: 'genero' }],
    })
      .then((peliculas) => res.status(200).send(peliculas))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return pelicula.findByPk(req.params.id)
      .then((peliculaItem) => {
        if (!peliculaItem) {
          return res.status(404).send({ message: 'Pelicula no encontrada' });
        }

        return peliculaItem.update({
          titulo: req.body.titulo,
          descripcion: req.body.descripcion,
          anio: req.body.anio,
          rating: req.body.rating,
          director: req.body.director,
          duracion_minutos: req.body.duracion_minutos,
          imagen: req.body.imagen,
          id_genero: req.body.id_genero,
        });
      })
      .then((updated) => res.status(200).send(updated))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return pelicula.findByPk(req.params.id)
      .then((peliculaItem) => {
        if (!peliculaItem) {
          return res.status(404).send({ message: 'Pelicula no encontrada' });
        }

        return peliculaItem.destroy();
      })
      .then(() => res.status(200).send({ message: 'Pelicula eliminada' }))
      .catch((error) => res.status(400).send(error));
  },
};
