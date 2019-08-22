const azurePhotoSave = require('../azureService/azureStoragePhotos').azurePhotoSave;
const Validacao = require('../utils/validation').default

module.exports = (app, repository) => {

    app.get('/', (req, res) => {
        res.json({
            status: 'OK'
        })
    })

    /** GET all itens by Location
     * A localização dos itens e passada em um array
     * com longitude em 0
     * e latitude em 1
     */
    app.get('/itens/', async(req, res, next) => {
        repository.getAllItensByLocation(req.body.location[0], req.body.location[1], function(err, list) {
            if (err) return next(err);
            res.json(list);
        })
    })

    /** GET all itens by Name and Location
     * A localização dos itens e passada em um array
     * com longitude em 0
     * e latitude em 1
     */
    app.get('/itens/:name', async(req, res, next) => {
        repository.getItensByName(req.params.name, req.body.location[0], req.body.location[1], function(err, list) {
            if (err) return next(err);
            res.json(list);
        })
    })

    /** POST new item */
    app.post('/itens/', async(req, res, next) => {
        Validacao.isRequired(req.body.name, 'warming: Name field is required');
        Validacao.hasMinLen(req.body.name, 5, 'warming: Name field is unsuficient');
        Validacao.isRequired(req.body.description, 'warming: Description field is required');
        Validacao.isRequired(req.body.owner, 'warming: Owner is required');

        if (!Validacao.isValid()) {
            res.status(400).send(Validacao.error()).end()
            return
        }
        try {
            repository.saveNewItem({
                name: req.body.name,
                availability: req.body.availability,
                timeCust: req.body.timeCust,
                description: req.body.description,
                itensImages: 'https://thingstorage.blob.core.windows.net/itens-pictures/' + await azurePhotoSave(req.body.itensImages),
                delivery: req.body.delivery,
                location: {
                    type: "Point",
                    coordinates: req.body.location
                },
                owner: req.body.owner
            }, function(err, done) {
                if (err) return next(err);
                res.json(done);
            })
        } catch (error) {
            console.log(error);
        }  
    })

    /** PUT a item by ID */
    app.put('/itens/:id', async(req, res, next) => {
        repository.updateByID(req.params.id, {
            name: req.body.name,
            delivery: req.body.delivery,
            timeCust: req.body.timeCust,
            description: req.body.description
        }, function(err, done) {
            if (err) return next(err);
            res.json(done);
        })
    })

    app.delete('/itens/:id', async(req, res, next) => {
        repository.deletItemById(req.params.id, function(err, done) {
            if (err) return next(err);
            res.json(done);
        })
    })
}