const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prestamos'
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();  // Usar await para obtener la conexión
    console.log('Conexión exitosa');
    connection.release();  // Importante liberar la conexión cuando se termina
  } catch (error) {
    console.error('Error al conectar:', error);
  }
}

// Llamar a la función para probar la conexión
testConnection();
module.exports = pool
