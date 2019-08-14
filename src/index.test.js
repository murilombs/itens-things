require('dotenv-safe').load(); // carrega as variaveis globais
require('./config/mongodb.test').runTest();
require('./model/itens') // rota do model
require('./repository/repository.test').runTest();
require('./api/api.test').runTest();
