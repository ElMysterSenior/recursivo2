const express = require('express');
const cors = require('cors');
const app = express();
const { validarRecaptcha } = require('./auth'); 
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
app.delete('/usuarios/eliminar/:nombreUsuario', usuariosController.eliminarUsuarioPorNombreUsuario);
app.put('/api/usuarios-admin/:id', usuariosController.actualizarUsuarioAdmin);
const port = app.get('port');

app.post('/api/validar-recaptcha', async (req, res) => {
    try {
      const token = req.body.token;
      const esValido = await validarRecaptcha(token);
      res.json({ recaptchaValido: esValido });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  
app.listen(port, () => {
    console.log(`Servidor Express en http://localhost:${port}`);
});
