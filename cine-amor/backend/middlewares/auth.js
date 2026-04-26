const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'cine_amor_secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).send({ message: 'Token de acceso requerido' });
    }

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.rol !== 'admin') {
        return res.status(403).send({
            message: 'Acceso denegado. Solo administradores pueden realizar esta acción.'
        });
    }
    next();
};

module.exports = {
    authenticateToken,
    authorizeAdmin
};