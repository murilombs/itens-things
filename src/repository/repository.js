const toObjectId = require('mongodb').ObjectId
const mongodb = require('../config/mongodb');

// importa os modulos
const mongoose = require('mongoose');
const Item = mongoose.model('Itens');

const collection = 'itensList';

/** Procura os Itens de modo aberto 
 * sem qualquer parametro de buscas
 * apenas as cordenadas */
exports.getAllItensByLocation = (lgt, lat, callback) => {
    mongodb.connect(function(err, db) {
        db.collection(collection).find({
            location:
              { $near:
                 {
                   $geometry: { type: "Point",  coordinates: [ lgt, lat ] },
                   $minDistance: 100,
                   $maxDistance: 5000
                 }
              },
              availability: true,
          }).project({
              name:1, 
              timeCust: 1, 
              itensImages: 1, 
              description: 1, 
              delivery: 1,
              owner: 1
            }).toArray(callback)
    })
}

/** Procura os Itens pelo nome e cordenadas*/
exports.getItensByName = (name = String(), lgt, lat, callback) => {
    mongodb.connect(function(err, db) {
        db.collection(collection).aggregate([
            {
                $geoNear: {
                   near: { type: "Point", coordinates: [ lgt, lat ] },
                   spherical: true,
                   query: { name: name },
                   distanceField: "calcDistance"
                }
             }
        ]).toArray(callback)
    })
}

/** Adicionar um novo item seguindo o Schemma */
exports.saveNewItem = (data, callback) => {
    let item = new Item(data);
    try {
        mongodb.connect(function(err, db) {
            db.collection(collection).insertOne(item, callback)
        })
    } catch (e) {
        console.log(e)
    }
}

/** Update de item por ID
 * campos :
 * name, delivery, timeCust, description
 */
exports.updateByID = (id, data, callback) => {
    try {
        mongodb.connect(function(err, db) {
            db.collection(collection).updateOne({_id: toObjectId(id)}, {
                $set: {
                    name: data.name,
                    delivery: data.delivery,
                    timeCust: data.timeCust,
                    description: data.description
                }
            }, 
            callback)
        })
    } catch(e) {
        console.log(e);
    }
}

/** deleta um Item pelo Id do mesmo */
exports.deletItemById = (id, callback) => {
    try {
        mongodb.connect(function (err, db) {
            db.collection(collection).deleteOne({_id: toObjectId(id)}, callback);
        })
    } catch (error) {
        console.log(error)
    }
}
