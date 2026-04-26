'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('cam_generos', [
      { id: 1, nombre: 'Romance', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nombre: 'Drama romantico', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nombre: 'Comedia romantica', createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('cam_peliculas', [
      {
        titulo: 'Titanic',
        descripcion: 'Una historia de amor imposible a bordo del barco mas famoso del mundo.',
        anio: 1997,
        rating: 9.2,
        director: 'James Cameron',
        duracion_minutos: 195,
        imagen: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
        id_genero: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'The Notebook',
        descripcion: 'Una historia intensa sobre el amor eterno que supera el tiempo.',
        anio: 2004,
        rating: 8.8,
        director: 'Nick Cassavetes',
        duracion_minutos: 123,
        imagen: 'https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg',
        id_genero: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Pride & Prejudice',
        descripcion: 'Romance clasico basado en la novela de Jane Austen.',
        anio: 2005,
        rating: 8.7,
        director: 'Joe Wright',
        duracion_minutos: 129,
        imagen: 'https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg',
        id_genero: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'La La Land',
        descripcion: 'Una historia de amor entre suenos y musica en Los Angeles.',
        anio: 2016,
        rating: 8.5,
        director: 'Damien Chazelle',
        duracion_minutos: 128,
        imagen: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
        id_genero: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('cam_peliculas', null, {});
    await queryInterface.bulkDelete('cam_generos', null, {});
  },
};
