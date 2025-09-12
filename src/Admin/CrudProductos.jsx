import React from 'react'

function CrudProductos() {

  

  return (
    <>
    <input placeholder="Nombre" 
  value={nuevo.nombre} 
  onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
  <input placeholder="Precio" 
  type="number" value={nuevo.precio} 
  onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })} />
    <div>
      <h1>Crud Productos</h1>
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((p) => (
        <tr key={p.id}>
          <td>{p.id}</td>
          <td>{p.nombre}</td>
          <td>${p.precio}</td>
          <td>
            <button onClick={() => handleEdit(p.id)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Borrar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  </>
  )
}

export default CrudProductos
