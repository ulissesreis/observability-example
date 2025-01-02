'use strict';

require('./otel.js');

const express = require('express');
const { customMiddleware } = require('./middleware');
const app = express();

const port = 3001;

app.use(customMiddleware);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo! Rota principal instrumentada.');
});

app.get('/info', (req, res) => {
  res.json({ message: 'Esta é a rota /info instrumentada.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
