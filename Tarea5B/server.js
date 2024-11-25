require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'A1234',
    database: process.env.DB_NAME || 'cine'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

app.use(express.static(__dirname + '/public'));

// Medir el tiempo de procesamiento
app.use((req, res, next) => {
    req.startTime = Date.now(); 
    res.on('finish', () => {
        const elapsedTime = Date.now() - req.startTime; 
        console.log(`Ruta: ${req.path}, Método: ${req.method}, Tiempo: ${elapsedTime}ms`);
    });
    next();
});


app.get('/actors/:name', (req, res) => {
    const actorName = req.params.name;
    const query = 'SELECT primaryName, birthYear, deathYear, primaryProfession, knownForTitle FROM combined WHERE primaryName = ?';

    db.query(query, [actorName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }
        res.json(results[0]);
    });
});


app.delete('/actors/:name', (req, res) => {
    const actorName = req.params.name;
    const query = 'DELETE FROM combined WHERE primaryName = ?';

    db.query(query, [actorName], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actor no encontrado para eliminar' });
        }
        res.json({ message: `Actor ${actorName} eliminado con éxito` });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
