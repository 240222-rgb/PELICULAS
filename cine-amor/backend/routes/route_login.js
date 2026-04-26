const loginController = require('../controller/controller_login');

module.exports = (app) => {
  app.post('/api/login', loginController.login);
};
