# *Festival de Conciertos en Colombia*

---

### Entregable:

- Repositorio GitHub que contenga:
    - `consultas.js`: archivo con TODAS las consultas, funciones, transacciones e índices solicitados.
    - `README.md`: explicaciones breves, integrantes, y evidencias (capturas o resultados de las consultas).
- El trabajo puede hacerse:
    - Individualmente.
    - En grupos de máximo 3 personas.
- **Entrega: 19 de junio 1:00 pm.**

---

## Base de datos: `festival_conciertos`

---

- **Colección bandas**
    
    ```jsx
    db.bandas.insertMany([
      { nombre: "Aterciopelados", genero: "Rock", pais_origen: "Colombia", miembros: ["Andrea Echeverri", "Héctor Buitrago"], activa: true },
      { nombre: "Bomba Estéreo", genero: "Electro Tropical", pais_origen: "Colombia", miembros: ["Li Saumet"], activa: true },
      { nombre: "Systema Solar", genero: "Fusión", pais_origen: "Colombia", miembros: ["DJ Corpas", "John Pri"], activa: false },
      { nombre: "ChocQuibTown", genero: "Hip Hop", pais_origen: "Colombia", miembros: ["Goyo", "Tostao", "Slow Mike"], activa: true },
      { nombre: "Monsieur Periné", genero: "Pop Fusión", pais_origen: "Colombia", miembros: ["Catalina García", "Santiago Prieto"], activa: true }
    ]);
    ```
    

---

- **Colección escenarios**
    
    ```jsx
    db.escenarios.insertMany([
      { nombre: "Escenario Principal", ubicacion: "Parque Simón Bolívar", capacidad: 5000, ciudad: "Bogotá" },
      { nombre: "Escenario Alterno", ubicacion: "Cancha Panamericana", capacidad: 2500, ciudad: "Cali" },
      { nombre: "Tarima Caribe", ubicacion: "Malecón del Río", capacidad: 3000, ciudad: "Barranquilla" }
    ]);
    ```
    

---

- **Colección presentaciones**
    
    ```jsx
    db.presentaciones.insertMany([
      { banda: "Aterciopelados", escenario: "Escenario Principal", hora: ISODate("2025-06-18T20:00:00Z"), duracion_minutos: 90, asistencia_estimadada: 4500 },
      { banda: "Bomba Estéreo", escenario: "Escenario Alterno", hora: ISODate("2025-06-19T22:00:00Z"), duracion_minutos: 75, asistencia_estimadada: 2300 },
      { banda: "Systema Solar", escenario: "Tarima Caribe", hora: ISODate("2025-06-20T21:00:00Z"), duracion_minutos: 80, asistencia_estimadada: 2800 },
      { banda: "ChocQuibTown", escenario: "Tarima Caribe", hora: ISODate("2025-06-21T20:30:00Z"), duracion_minutos: 70, asistencia_estimadada: 3000 },
      { banda: "Monsieur Periné", escenario: "Escenario Principal", hora: ISODate("2025-06-22T19:00:00Z"), duracion_minutos: 85, asistencia_estimadada: 4200 }
    ]);
    ```
    

---

- **Colección asistentes**
    
    ```jsx
    db.asistentes.insertMany([
      {
        nombre: "Juan Pérez",
        edad: 27,
        ciudad: "Medellín",
        generos_favoritos: ["Rock", "Indie"],
        boletos_comprados: [
          { escenario: "Escenario Principal", dia: "2025-06-18" },
          { escenario: "Escenario Principal", dia: "2025-06-22" }
        ]
      },
      {
        nombre: "María Gómez",
        edad: 34,
        ciudad: "Bogotá",
        generos_favoritos: ["Electro Tropical"],
        boletos_comprados: [
          { escenario: "Escenario Alterno", dia: "2025-06-19" }
        ]
      },
      {
        nombre: "Carlos Martínez",
        edad: 22,
        ciudad: "Cali",
        generos_favoritos: ["Fusión", "Hip Hop"],
        boletos_comprados: [
          { escenario: "Tarima Caribe", dia: "2025-06-20" }
        ]
      },
      {
        nombre: "Luisa Quintero",
        edad: 29,
        ciudad: "Barranquilla",
        generos_favoritos: ["Pop Fusión", "Rock"],
        boletos_comprados: [
          { escenario: "Escenario Principal", dia: "2025-06-22" }
        ]
      }
    ]);
    
    ```
    

---

## Requerimientos

Realiza y documenta en el repositorio las siguientes tareas:

---

### **Consultas**

1. **Expresiones Regulares**
    - Buscar bandas cuyo nombre **empiece por la letra “A”**.
    ### Respuesta: db.bandas.find({nombre: {$regex: "^A", $options: "i"}}) 
    - Buscar asistentes cuyo **nombre contenga "Gómez"**.
    ### Respuesta: db.asistentes.find({nombre: {$regex: "Gómez", $options: "i"}}) 

2. **Operadores de Arreglos**
    - Buscar asistentes que tengan `"Rock"` dentro de su campo `generos_favoritos`.
    ### Respuesta: db.asistentes.find({generos_favoritos: {$regex: "Rock", $options: "i"}})

3. **Aggregation Framework**
    - Agrupar presentaciones por `escenario` y contar cuántas presentaciones hay por cada uno.
    ### Respuesta: db.presentaciones.aggregate([{$group: {_id: "$escenario",totalPresentaciones: { $sum: 1 }}}])
    - Calcular el **promedio de duración** de las presentaciones.
    ### Respuesta: db.presentaciones.aggregate([{$group: {_id:null,promedioDuracion: { $avg: "$duracion_minutos" }}}])

---

### **Funciones en system.js**

1. Crear una función llamada `escenariosPorCiudad(ciudad)` que devuelva todos los escenarios en esa ciudad.
2. Crear una función llamada `bandasPorGenero(genero)` que devuelva todas las bandas activas de ese género.

---

### **Transacciones (requiere replica set)**

1. Simular compra de un boleto:
    - Insertar nuevo boleto en `boletos_comprados` de un asistente.
    - Disminuir en 1 la capacidad del escenario correspondiente.
2. Reversar la compra:
    - Eliminar el boleto insertado anteriormente.
    - Incrementar la capacidad del escenario.

---

### **Índices + Consultas**

1. Crear un índice en `bandas.nombre` y buscar una banda específica por nombre.
2. Crear un índice en `presentaciones.escenario` y hacer una consulta para contar presentaciones de un escenario.
3. Crear un índice compuesto en `asistentes.ciudad` y `edad`, luego consultar asistentes de Bogotá menores de 30.