const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3000
const { getCanciones, agregarCancion, eliminarCancion, actualizarCancion } = require('./crud');

app.use(express.json())

app.get('/', (_, res) => {
  try {
    const file = fs.readFileSync('./public/index.html', 'UTF-8')
    res.status(200).end(file)
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el archivo HTML' })
  }
})

app.get('/canciones', (_, res) => {
  try {
    const canciones = getCanciones()
    res.json(canciones)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de canciones' })
  }
})

app.post('/canciones', (req, res) => {
  try {
    const cancion = req.body
    agregarCancion(cancion)
    res.send('Canción agregada con éxito!')
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la canción' })
  }
})

app.delete('/canciones/:id', (req, res) => {
  try {
    const { id } = req.params
    eliminarCancion(id)
    res.send('Canción eliminada con éxito')
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la canción' })
  }
})

app.put('/canciones/:id', (req, res) => {
  try {
    const { id } = req.params
    const nuevaCancion = req.body
    actualizarCancion(id, nuevaCancion)
    res.send('Canción modificada con éxito')
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la canción' })
  }
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Error 404: Recurso no encontrado' }))

app.listen(PORT, () => console.log(`Servidor OK: http://localhost:${PORT}`))
