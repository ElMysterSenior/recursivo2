const axios = require('axios');

const RECAPTCHA_SECRET_KEY = '6LeU1SApAAAAAJ1T8yaVz-MqJhXXKJ_XTV7dTyBy';

async function validarRecaptcha(token) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;
  
  try {
    const response = await axios.post(url);
    if (!response.data.success) {
      throw new Error('Fallo la verificación de reCAPTCHA');
    }
    // Aquí puedes añadir más lógica si es necesario
    return response.data.success;
  } catch (error) {
    console.error('Error validando reCAPTCHA:', error.message);
    throw error;
  }
}

module.exports = { validarRecaptcha };
