require('dotenv-safe').load(); // carrega as variaveis globais
require('./src/config/mongodb.test').runTest();
require('./src/model/itens') // rota do model
require('./src/repository/repository.test').runTest();
require('./src/api/api.test').runTest();
