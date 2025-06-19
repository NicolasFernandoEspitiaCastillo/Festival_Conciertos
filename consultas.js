// db.bandas.find({nombre: {$regex: "^A", $options: "i"}}) 

// db.asistentes.find({nombre: {$regex: "Gómez", $options: "i"}}) 

// db.asistentes.find({generos_favoritos: {$regex: "Rock", $options: "i"}})

// db.presentaciones.aggregate([{$group: {_id: "$escenario",totalPresentaciones: { $sum: 1 }}}])

// db.presentaciones.aggregate([{$group: {_id:null,promedioDuracion: { $avg: "$duracion_minutos" }}}])


const session = db.getMongo().startSession();
const dbSession = session.getDatabase("festival_conciertos");

try {
  session.startTransaction();

  // 1. Insertar nuevo boleto en el array de la asistente
  dbSession.asistentes.updateOne(
    { nombre: "María Gómez" },
    {
      $push: {
        boletos_comprados: {
          escenario: "Escenario Alterno",
          dia: "2025-06-21"
        }
      }
    }
  );

  // 2. Disminuir capacidad del escenario en 1
  dbSession.escenarios.updateOne(
    { nombre: "Escenario Alterno" },
    { $inc: { capacidad: -1 } }
  );

  session.commitTransaction();
  print("✅ Transacción completada correctamente");

} catch (e) {
  session.abortTransaction();
  print("❌ Error en la transacción:", e.message);
} finally {
  session.endSession();
}


// const session = db.getMongo().startSession();
// const dbSession = session.getDatabase("festival_conciertos");

try {
  session.startTransaction();

  // 1. Eliminar el boleto del array del asistente
  dbSession.asistentes.updateOne(
    { nombre: "María Gómez" },
    {
      $pull: {
        boletos_comprados: {
          escenario: "Escenario Alterno",
          dia: "2025-06-21"
        }
      }
    }
  );

  // 2. Incrementar la capacidad del escenario
  dbSession.escenarios.updateOne(
    { nombre: "Escenario Alterno" },
    { $inc: { capacidad: 1 } }
  );

  session.commitTransaction();
  print("✅ Reverso de compra completado correctamente");

} catch (e) {
  session.abortTransaction();
  print("❌ Error al reversar la compra:", e.message);
} finally {
  session.endSession();
}
