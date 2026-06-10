const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los autores
router.get('/', (req, res) => {
    db.query('SELECT * FROM autores', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Crear autor
router.post('/', (req, res) => {
    const { nombre, email, imagen } = req.body;

    db.query(
        'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
        [nombre, email, imagen],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Autor creado', id: result.insertId });
        }
    );
});

module.exports = router;