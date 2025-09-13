import { useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "./NavAdmin";

const CrudUsuario = () => {
  const [administradores, setAdministradores] = useState([]);
  const [nuevoAdmin, setNuevoAdmin] = useState({ nombre: "", email: "" });
  const [editando, setEditando] = useState(null);

  // 🚀 cambiar esta URL si en tu proyecto usás otra (la misma que productos/categorías)
  const API_URL = "http://localhost:3000/api/administradores";

  // Obtener administradores
  const fetchAdministradores = async () => {
    try {
      const res = await axios.get(API_URL);
      setAdministradores(res.data);
    } catch (error) {
      console.error("Error al obtener administradores", error);
    }
  };

  useEffect(() => {
    fetchAdministradores();
  }, []);

  // Crear nuevo
  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, nuevoAdmin);
      setNuevoAdmin({ nombre: "", email: "" });
      fetchAdministradores();
    } catch (error) {
      console.error("Error al crear administrador", error);
    }
  };

  // Editar
  const handleEditar = (admin) => {
    setEditando(admin);
    setNuevoAdmin({ nombre: admin.nombre, email: admin.email });
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editando.id}`, nuevoAdmin);
      setNuevoAdmin({ nombre: "", email: "" });
      setEditando(null);
      fetchAdministradores();
    } catch (error) {
      console.error("Error al actualizar administrador", error);
    }
  };

  // Eliminar
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este administrador?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchAdministradores();
    } catch (error) {
      console.error("Error al eliminar administrador", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <NavAdmin/>
      <div className="mb-4 bg-amber-300">
        <h1 className="text-center h-full p-2 w-full" >Gestión de Administradores</h1>
      </div>

      {/* Formulario */}
      <form onSubmit={editando ? handleActualizar : handleCrear}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoAdmin.nombre}
          onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, nombre: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevoAdmin.email}
          onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, email: e.target.value })}
          required
        />
        <button type="submit">{editando ? "Actualizar" : "Agregar"}</button>
        {editando && (
          <button type="button" onClick={() => {
            setEditando(null);
            setNuevoAdmin({ nombre: "", email: "" });
          }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla */}
      <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {administradores.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.nombre}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => handleEditar(admin)}>Editar</button>
                <button onClick={() => handleEliminar(admin.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudUsuario;