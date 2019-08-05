const test = require('tape');
const repository = require('./repository');

/** Na pesquisa por cordenadas longitude vem antes de Latitude */

function runTest() {
    /** Longitude & Latitude */
    test('Repository getAllItensByLocation', (t) => {
        repository.getAllItensByLocation(-46.6374, -23.6747, (err, res) => {
            t.assert(!err && res, 'All itens by location returned');
            console.log(res);
            t.end();
        })
    })

    test('Repository getItensByName', (t) => {
        repository.getItensByName('teste 2', -46.6374, -23.6747, (err, res) => {
            t.assert(!err && res, 'All itens by name returned');
            console.log(res);
            t.end();
        })
    })
    
   test('Repository saveNewItem', (t) => {
        repository.saveNewItem(data, (err, res) => {
            t.assert(!err && res.insertedCount == 1, 'Item saved');
            t.end();
        })
    })
    
    test('Repository updateByID', (t) => {
        repository.updateByID(idUp, dataUp, (err, res) => {
            t.assert(!err && res.modifiedCount == 1, 'Item updated');
            t.end();
        })
    }) 

    test('Repository deletItemById', (t) => {
        repository.deletItemById(idDelete, (err, res) => {
            t.assert(!err && res.deletedCount == 1, 'Item deleted');
            t.end();
        })
    })

}

module.exports = { runTest }