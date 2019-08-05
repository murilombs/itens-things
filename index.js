require('dotenv-safe').load();
const server = require('./src/server/server');
require('./src/model/itens');
const repository = require('./src/repository/repository');
const api = require('./src/api/api');

server.start(api, repository, (err, app) => {
    console.log('Server iniciado')
})