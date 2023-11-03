const fs = require('fs')

function getCanciones() {
  const canciones = JSON.parse(fs.readFileSync("./db/canciones.json"))
  return canciones
}

function agregarCancion(cancion) {
  const canciones = getCanciones()
  canciones.push(cancion)
  fs.writeFileSync("./db/canciones.json", JSON.stringify(canciones))
}

function eliminarCancion(id) {
  const canciones = getCanciones()
  const index = canciones.findIndex(c => c.id == id)
  if (index !== -1) {
    canciones.splice(index, 1)
    fs.writeFileSync("./db/canciones.json", JSON.stringify(canciones))
  }
}

function actualizarCancion(id, nuevaCancion) {
  const canciones = getCanciones()
  const index = canciones.findIndex(c => c.id == id)
  if (index !== -1) {
    canciones[index] = nuevaCancion
    fs.writeFileSync("./db/canciones.json", JSON.stringify(canciones))
  }
}

module.exports = {
  getCanciones,
  agregarCancion,
  eliminarCancion,
  actualizarCancion,
};
