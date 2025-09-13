import { useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "./NavAdmin";

const CategoriasAdmin = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [editandoCategoria, setEditandoCategoria] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  // Obtener categorías
  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categoria");
      setCategorias(res.data);
    } catch (error) {
      console.error("Error al obtener categorías", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Crear categoría
  const handleCrear = async () => {
    if (!nuevaCategoria.nombre.trim()) return;
    try {
      const res = await axios.post("http://localhost:3000/api/categoria", nuevaCategoria);
      setCategorias([...categorias, res.data]);
      setNuevaCategoria({ nombre: "", descripcion: "", imagen: "" });
    } catch (error) {
      console.error("Error al crear categoría", error);
    }
  };

  // Editar categoría
  const handleEditar = (categoria) => {
    setEditandoId(categoria.id);
    setEditandoCategoria({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || "descripcion",
      imagen: categoria.imagen || "imagen",
    });
  };

  const handleGuardarEdicion = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/categoria/${id}`, editandoCategoria);
      setCategorias(
        categorias.map((cat) => (cat.id === id ? res.data : cat))
      );
      setEditandoId(null);
      setEditandoCategoria({ nombre: "", descripcion: "", imagen: "" });
    } catch (error) {
      console.error("Error al actualizar categoría", error);
    }
  };

  // Eliminar categoría
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/categoria/${id}`);
      setCategorias(categorias.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error al eliminar categoría", error);
    }
  };

  return (
    <>
    <div><NavAdmin/></div>
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Administrar Categorías</h2>

      {/* Crear nueva categoría */}
      <div className="mb-4 flex flex-col gap-2 border p-4 rounded-md bg-gray-50">
        <input
          type="text"
          value={nuevaCategoria.nombre}
          onChange={(e) =>
            setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })
          }
          placeholder="Nombre de categoría"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          value={nuevaCategoria.descripcion}
          onChange={(e) =>
            setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })
          }
          placeholder="Descripción"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          value={nuevaCategoria.imagen}
          onChange={(e) =>
            setNuevaCategoria({ ...nuevaCategoria, imagen: e.target.value })
          }
          placeholder="URL de imagen (opcional)"
          className="border p-2 rounded-md"
        />
        <button
          onClick={handleCrear}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Crear Categoría
        </button>
      </div>

      {/* Lista de categorías */}
      <ul className="space-y-2">
        {categorias.map((cat) => (
          <li
            key={cat.id}
            className="p-3 border rounded-md flex justify-between items-center bg-white"
          >
            {editandoId === cat.id ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={editandoCategoria.nombre}
                  onChange={(e) =>
                    setEditandoCategoria({
                      ...editandoCategoria,
                      nombre: e.target.value,
                    })
                  }
                  className="border p-1 rounded-md"
                />
                <input
                  type="text"
                  value={editandoCategoria.descripcion}
                  onChange={(e) =>
                    setEditandoCategoria({
                      ...editandoCategoria,
                      descripcion: e.target.value,
                    })
                  }
                  className="border p-1 rounded-md"
                />
                <input
                  type="text"
                  value={editandoCategoria.imagen}
                  onChange={(e) =>
                    setEditandoCategoria({
                      ...editandoCategoria,
                      imagen: e.target.value,
                    })
                  }
                  className="border p-1 rounded-md"
                />
                <button
                  onClick={() => handleGuardarEdicion(cat.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-bold">{cat.nombre}</p>
                  <p className="text-sm text-gray-600">{cat.descripcion}</p>
                  {cat.imagen && (
                    <img
                      src={cat.imagen}
                      alt={cat.nombre}
                      className="w-20 h-20 object-cover mt-2 rounded-md"
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditar(cat)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(cat.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default CategoriasAdmin;
