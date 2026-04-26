const db = require('../models');
const favorito = db.cam_favoritos;
const favoritoDetalle = db.cad_favorito_detalle;
const pelicula = db.cam_peliculas;
const genero = db.cam_generos;

const serializeFavorite = (favorite) => {
  const detalles = Array.isArray(favorite.detalles) ? favorite.detalles : [];

  return {
    id: favorite.id,
    userId: favorite.id_usuario,
    name: favorite.nombre,
    date: favorite.fecha_creacion,
    movies: detalles.map((detalle) => ({
      id: detalle.id_pelicula,
      detailId: detalle.id,
      note: detalle.nota,
      movie: detalle.pelicula,
    })),
  };
};

const loadFavorite = (where, transaction) => favorito.findOne({
  where,
  include: [
    {
      model: favoritoDetalle,
      as: 'detalles',
      include: [
        {
          model: pelicula,
          as: 'pelicula',
          include: [{ model: genero, as: 'genero' }],
        },
      ],
    },
  ],
  order: [[{ model: favoritoDetalle, as: 'detalles' }, 'id', 'ASC']],
  transaction,
});

const canAccessFavorite = (req, favoriteItem) => req.user.rol === 'admin' || Number(favoriteItem.id_usuario) === Number(req.user.id);

module.exports = {
  create(req, res) {
    return favorito.create({
      nombre: req.body.nombre || 'Mi lista',
      id_usuario: req.body.id_usuario || req.user.id,
      fecha_creacion: req.body.fecha_creacion || new Date(),
    })
      .then((favorite) => res.status(201).send(favorite))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    const where = req.user.rol === 'admin' ? {} : { id_usuario: req.user.id };

    return favorito.findAll({
      where,
      include: [
        {
          model: favoritoDetalle,
          as: 'detalles',
          include: [
            {
              model: pelicula,
              as: 'pelicula',
              include: [{ model: genero, as: 'genero' }],
            },
          ],
        },
      ],
      order: [['fecha_creacion', 'DESC']],
    })
      .then((favorites) => res.status(200).send(favorites.map(serializeFavorite)))
      .catch((error) => res.status(400).send(error));
  },

  findById(req, res) {
    return loadFavorite({ id: req.params.id })
      .then((favoriteItem) => {
        if (!favoriteItem) {
          return res.status(404).send({ message: 'Lista no encontrada' });
        }

        if (!canAccessFavorite(req, favoriteItem)) {
          return res.status(403).send({ message: 'No tienes permisos para ver esta lista' });
        }

        return res.status(200).send(serializeFavorite(favoriteItem));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return favorito.findByPk(req.params.id)
      .then((favoriteItem) => {
        if (!favoriteItem) {
          return res.status(404).send({ message: 'Lista no encontrada' });
        }

        if (!canAccessFavorite(req, favoriteItem)) {
          return res.status(403).send({ message: 'No tienes permisos para eliminar esta lista' });
        }

        return favoriteItem.destroy();
      })
      .then(() => res.status(200).send({ message: 'Lista eliminada' }))
      .catch((error) => res.status(400).send(error));
  },

  addMovie(req, res) {
    const requestedUserId = req.body.userId || req.body.id_usuario;
    const ownerId = req.user.rol === 'admin' && requestedUserId ? Number(requestedUserId) : Number(req.user.id);
    const movieId = Number(req.body.movieId || req.body.id_pelicula);
    const note = req.body.note || null;

    if (!ownerId || !movieId) {
      return res.status(400).send({ message: 'Debe proporcionar usuario y pelicula' });
    }

    return db.sequelize.transaction(async (transaction) => {
      const movieItem = await pelicula.findByPk(movieId, { transaction });

      if (!movieItem) {
        const error = new Error('Pelicula no encontrada');
        error.statusCode = 404;
        throw error;
      }

      let favoriteItem = await favorito.findOne({
        where: { id_usuario: ownerId },
        order: [['fecha_creacion', 'DESC']],
        transaction,
      });

      if (!favoriteItem) {
        favoriteItem = await favorito.create({
          nombre: 'Mi lista',
          id_usuario: ownerId,
          fecha_creacion: new Date(),
        }, { transaction });
      }

      const existingDetail = await favoritoDetalle.findOne({
        where: { id_favorito: favoriteItem.id, id_pelicula: movieId },
        transaction,
      });

      if (existingDetail) {
        await existingDetail.update({ nota: note || existingDetail.nota }, { transaction });
      } else {
        await favoritoDetalle.create({
          nota: note,
          id_favorito: favoriteItem.id,
          id_pelicula: movieId,
        }, { transaction });
      }

      return loadFavorite({ id: favoriteItem.id }, transaction);
    }).then((favoriteItem) => res.status(200).send(serializeFavorite(favoriteItem)))
      .catch((error) => {
        if (error.statusCode) {
          return res.status(error.statusCode).send({ message: error.message });
        }

        return res.status(400).send({
          message: 'No se pudo guardar la pelicula en favoritos',
          error: error.message,
        });
      });
  },

  removeMovie(req, res) {
    const favoriteId = Number(req.params.favoriteId);
    const movieId = Number(req.params.movieId);

    return db.sequelize.transaction(async (transaction) => {
      const favoriteItem = await favorito.findByPk(favoriteId, { transaction });

      if (!favoriteItem) {
        const error = new Error('Lista no encontrada');
        error.statusCode = 404;
        throw error;
      }

      if (!canAccessFavorite(req, favoriteItem)) {
        const error = new Error('No tienes permisos para modificar esta lista');
        error.statusCode = 403;
        throw error;
      }

      const detail = await favoritoDetalle.findOne({
        where: { id_favorito: favoriteId, id_pelicula: movieId },
        transaction,
      });

      if (!detail) {
        const error = new Error('Pelicula no encontrada en favoritos');
        error.statusCode = 404;
        throw error;
      }

      await detail.destroy({ transaction });

      const remainingItems = await favoritoDetalle.count({
        where: { id_favorito: favoriteId },
        transaction,
      });

      if (remainingItems === 0) {
        await favoriteItem.destroy({ transaction });
        return null;
      }

      return loadFavorite({ id: favoriteId }, transaction);
    }).then((favoriteItem) => {
      if (!favoriteItem) {
        return res.status(200).send({ message: 'Lista eliminada' });
      }

      return res.status(200).send(serializeFavorite(favoriteItem));
    }).catch((error) => {
      if (error.statusCode) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(400).send({
        message: 'No se pudo actualizar favoritos',
        error: error.message,
      });
    });
  },
};
