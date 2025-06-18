db.bandas.find({nombre: {$regex: "^A", $options: "i"}}) 

db.asistentes.find({nombre: {$regex: "Gómez", $options: "i"}}) 

db.asistentes.find({generos_favoritos: {$regex: "Rock", $options: "i"}})

db.presentaciones.aggregate([{$group: {_id: "$escenario",totalPresentaciones: { $sum: 1 }}}])

db.presentaciones.aggregate([{$group: {_id:null,promedioDuracion: { $avg: "$duracion_minutos" }}}])