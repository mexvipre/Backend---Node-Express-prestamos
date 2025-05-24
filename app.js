const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const indexRoutes = require('./routes/index.routes');
const contratoRoutes = require('./routes/contrato.routes');
const beneficiarioRoutes = require('./routes/beneficiario.routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', indexRoutes);
app.use('/contratos', contratoRoutes);
app.use('/beneficiarios', beneficiarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
