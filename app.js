const express = require('express');
const cors = require('cors');
const app = express();
const usuariosController = require('./crud/usuariosController');

const corsOptions = {
    origin: 'http://localhost:4200',  // Permite solicitudes solo desde localhost:4200
    optionsSuccessStatus: 200
};

app.set('port', 3000);
app.set('json spaces', 2);

app.use(cors(corsOptions));  // Configura CORS primero
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/usuarios/verificar/:nombreUsuario', usuariosController.verificarUsuarioExistente);
app.get('/api/usuarios', usuariosController.obtenerUsuarios);
app.get('/api/usuarios/:id', usuariosController.obtenerUsuarioPorId);
app.post('/api/usuarios', usuariosController.crearUsuario);
app.put('/api/usuarios/:id', usuariosController.actualizarUsuario);
app.delete('/api/usuarios/:id', usuariosController.eliminarUsuario);

const port = app.get('port');
app.listen(port, () => {
    console.log(`Servidor Express en http://localhost:${port}`);
});
