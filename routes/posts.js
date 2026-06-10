const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los posts con autor
router.get('/', (req, res) => {
    const query = `
        SELECT posts.*, autores.nombre, autores.email, autores.imagen
        FROM posts
        INNER JOIN autores ON posts.autor_id = autores.id
    `;

    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Crear post
router.post('/', (req, res) => {
    const { titulo, descripcion, categoria, autor_id } = req.body;

    db.query(
        'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
        [titulo, descripcion, categoria, autor_id],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Post creado', id: result.insertId });
        }
    );
});

// Obtener posts por autor (REQUERIMIENTO CLAVE)
router.get('/autor/:id', (req, res) => {
    const autorId = req.params.id;

    const query = `
        SELECT posts.*, autores.nombre, autores.email
        FROM posts
        INNER JOIN autores ON posts.autor_id = autores.id
        WHERE autores.id = ?
    `;

    db.query(query, [autorId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;