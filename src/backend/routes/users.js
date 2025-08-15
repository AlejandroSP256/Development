import { Router } from "express";
import db from '../db/connection.js'

const router = Router()

router.get('/', (req, res) => {
    db.query(`SELECT * FROM users`, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en la base de datos');
        }
        res.json(results);
    })
})

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM users WHERE ID = ?`, req.params.id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor')
        }
        res.json(result)
   })
})

router.post('/', (req, res) => {
   const { name, email } = req.body
   if (!name || !email) {
    return res.status(400).send('Faltan campos requeridos')
   }
   const sql = `INSERT INTO users (name, email) VALUES (?, ?)`
   db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error(`Error al insertar los datos: ${err}`);
            return res.status(500).send('Error en el servidor');
        }
        res.status(201).send(`Usuario creado: ${result.insertId}`)
   })
})

router.put('/:id', (req, res) => {
   const { name, email } = req.body
   if (!name || !email) {
    return res.status(400).send('Faltan campos requeridos')
   }
   const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`
   db.query(sql, [name, email, req.params.id], (err, result) => {
        if (err) {
            console.error(`Error al actualizar usuario: ${err}`);
            return res.status(500).send('Error en el servidor')
        }
        res.json(result)
   })
})
 
router.delete('/:id', (req, res) => {
   const sql = `DELETE FROM users WHERE id = ?`
   db.query(sql, req.params.id, (err, result) => {
        if (err) {
            console.error(`Error al eliminar usuario: ${err}`);
            return res.status(500).send('Error en el servidor')
        }
        res.json(result)
   })
})
export default router