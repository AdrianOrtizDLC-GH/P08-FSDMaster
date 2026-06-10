const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const postRoutes = require('./routes/posts');
const autorRoutes = require('./routes/autores');

app.use('/api/posts', postRoutes);
app.use('/api/autores', autorRoutes);

app.get('/', (req, res) => {
    res.send('API Blog funcionando correctamente');
});


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});