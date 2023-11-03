const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3000
const { getCanciones, agregarCancion, eliminarCancion, actualizarCancion } = require('./crud');

app.use(express.json())

app.get('/', (_, res) => {
    const file = fs.readFileSync('./public/index.html', 'UTF-8')
    res.status(200).end(file)
  })

  app.get('/canciones', (_, res) => {
    const canciones = getCanciones()
    res.json(canciones)
  })

  app.post('/canciones', (req, res) => {
    const cancion = req.body
    agregarCancion(cancion)
    res.send('Canción agregada con éxito!')
  })

  app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params
    eliminarCancion(id)
    res.send('Canción eliminada con éxito')
  })

  app.put('/canciones/:id', (req, res) => {
    const { id } = req.params
    const nuevaCancion = req.body
    actualizarCancion(id, nuevaCancion)
    res.send('Canción modificada con éxito')
  })

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'error 404 not found' }))

app.listen(PORT, () => console.log(`Servidor OK: http://localhost:${PORT}`))
