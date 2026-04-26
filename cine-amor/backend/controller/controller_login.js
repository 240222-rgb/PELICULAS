const usuario = require('../models').cam_usuarios;
const jwt = require('jsonwebtoken');

const sanitizeUser = (usuarioItem) => ({
  id: usuarioItem.id,
  nombre: usuarioItem.nombre,
  email: usuarioItem.email,
  rol: usuarioItem.rol,
});

module.exports = {
  login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email y contrasena son requeridos' });
    }

    return usuario.findOne({ where: { email } })
      .then((usuarioItem) => {
        if (!usuarioItem || usuarioItem.password !== password) {
          return res.status(401).send({ message: 'Usuario o contrasena incorrectos' });
        }

        const token = jwt.sign({
          id: usuarioItem.id,
          email: usuarioItem.email,
          nombre: usuarioItem.nombre,
          rol: usuarioItem.rol,
        }, process.env.JWT_SECRET || 'cine_amor_secret', { expiresIn: '24h' });

        return res.status(200).send({
          message: 'Login exitoso',
          token,
          userId: usuarioItem.id,
          rol: usuarioItem.rol,
          user: sanitizeUser(usuarioItem),
        });
      })
      .catch((error) => res.status(500).send({
        message: 'Error al procesar login',
        error: error.message,
      }));
  },
};
