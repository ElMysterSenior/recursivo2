const db = require('../db/db');
const Usuario = require('../models/Usuario');


exports.verificarUsuarioExistente = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;

    db.query('SELECT * FROM Usuarios WHERE nombreUsuario = ?', [nombreUsuario], (err, results) => {
        if (err) {
            console.error('Error al verificar usuario existente:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            const usuario = results[0];

            res.json(usuario);
        }
    });
};

// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.json(results);
        }
    });
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM Usuarios WHERE ID = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario por ID:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json(results[0]);
        }
    });
};

// Crear un nuevo usuario
exports.crearUsuario = (req, res) => {
    const nuevoUsuario = new Usuario(
        null,
        req.body.nombreUsuario,
        req.body.claveUsuario,
        req.body.nombreCompleto,
        req.body.tipoUsuario
    );

    db.query('INSERT INTO Usuarios SET ?', nuevoUsuario, (err, result) => {
        if (err) {
            console.error('Error al crear nuevo usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            nuevoUsuario.id = result.insertId;
            res.status(201).json(nuevoUsuario);
        }
    });
};


// Eliminar un usuario por nombre de usuario
exports.eliminarUsuarioPorNombreUsuario = (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;

    db.query('DELETE FROM Usuarios WHERE nombreUsuario = ?', [nombreUsuario], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario por nombre de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json({ message: 'Usuario eliminado correctamente' });
        }
    });
};


// Actualizar un usuario por ID
exports.actualizarUsuario = (req, res) => {
    const userId = req.params.id;

    // Filtrar solo los campos editables del cuerpo de la solicitud
    const camposEditables = {
        nombreUsuario: req.body.nombreUsuario,
        claveUsuario: req.body.claveUsuario
    };

    // Eliminar campos indefinidos o nulos para evitar que se actualicen con valores vacíos
    Object.keys(camposEditables).forEach(key => {
        if (camposEditables[key] === undefined || camposEditables[key] === null) {
            delete camposEditables[key];
        }
    });

    db.query(
        'UPDATE Usuarios SET ? WHERE ID = ?',
        [camposEditables, userId],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar usuario por ID:', err);
                res.status(500).json({ message: 'Error interno del servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json({ message: 'Usuario actualizado correctamente' });
            }
        }
    );
};


exports.actualizarUsuarioAdmin = (req, res) => {
    const userId = req.params.id;
  
    // Asegúrate de que estos campos coincidan con tu modelo de usuario y base de datos
    const camposEditables = {
      nombreUsuario: req.body.nombreUsuario,
      claveUsuario: req.body.claveUsuario,
      nombreCompleto: req.body.nombreCompleto,
      tipoUsuario: req.body.tipoUsuario
      // Agrega otros campos editables según tu modelo de usuario
    };
  
    // Elimina campos indefinidos o nulos
    Object.keys(camposEditables).forEach(key => {
      if (camposEditables[key] === undefined || camposEditables[key] === null) {
        delete camposEditables[key];
      }
    });
  
    db.query(
      'UPDATE Usuarios SET ? WHERE ID = ?',
      [camposEditables, userId],
      (err, result) => {
        if (err) {
          console.error('Error al actualizar usuario por ID:', err);
          res.status(500).json({ message: 'Error interno del servidor' });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
          res.json({ message: 'Usuario actualizado correctamente' });
        }
      }
    );
  };
  
