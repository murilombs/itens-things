const test = require('tape')
const supertest = require('supertest')
const api = require('./api')
const server = require('../server/server')
const repository = require('../repository/repository')

const image = require('./image64').image;

function runTest() {
    server.start(api, repository, (err, app) => {

        /** Teste de get do item por proximidade */
        test('GET /itens/', (t) => {
            supertest(app)
            .get('/itens/')
            .send({
               location: [-46.6565, -23.6648]
            })
            .expect(200)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res, 'Itens list retorned')
                t.end()
            })
        })

        /** Teste de get de itens por proximidade filtrados por nome */
        test('GET /itens/:name', (t) => {
            supertest(app)
            .get('/itens/' + 'teste 2')
            .send({
                location: [-46.6565, -23.6648]
            })
            .expect(200)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res, 'Itens list retorned')
                t.end()
            })
        })

        /** Teste de Post de novo item */
        test('POST /itens/', (t) => {
            supertest(app)
            .post('/itens/')
            .send({
                name: 'Teste de Post',
                availability: true,
                timeCust: "24H | R$ 15,00",
                description:"test",
                itensImages: 'https://thingstorage.blob.core.windows.net/itens-pictures/' + image,
                delivery: 'Disponivel',
                location: { type: "Point", coordinates: [-46.6565, -23.6648] },
                owner: '5d2f7efd09702283400b87b5'
            })
            .expect(200)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res, 'Item created')
                t.end()
            })
        })

        /** testa a atualização de um registro */
        test('PUT /itens/:id', (t) => {
            supertest(app)
            .put('/itens/' + '5d3f54e7d85dc57d448b8a2f')
            .send({
                name: "Teste de update",
                delivery: "Indisponivel",
                timeCust: "24H | R$ 15,00",
                description: "Batedeira com tigela de inox com pas moveis"
            })
            .expect(200)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res, 'Item updated')
                t.end()
            })
        })

    })
}

module.exports = { runTest }