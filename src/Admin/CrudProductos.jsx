import { useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "./NavAdmin";

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState([{
    nombre: "",
    id_categoria: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    personalizacion: "",
    kg: "",
    oferta: false,
    descuento: 0,
  }]);
  const [nombre, setNombre] = useState("")
  const [idCategoria, setidCategoria] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [linkUrl, setlinkUrl] = useState("")
  const [kg, setKg] = useState("")
  const [personalizacion, setPersonalizacion] = useState("")
  const [oferta, setoferta] = useState(false)
  const [descuento, setdescuento] = useState("")

  const [editandoId, setEditandoId] = useState(null);
  const [editandoProducto, setEditandoProducto] = useState({});
  const [error, setError] = useState("");

  // Traer productos
  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/producto");
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar productos");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  
  
  const handleCrear = async () => {
    
    try {
      const res = await axios.post("http://localhost:3000/api/producto", {
        nombre: nombre,
        id_categoria: idCategoria,
        descripcion: descripcion,
        precio: precio,
        imagen: linkUrl,
        personalizacion: personalizacion,
        kg: kg,
        oferta: oferta,
        descuento: descuento
      });
      setProductos([...productos, res.data]);
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al crear producto");
    }
  };

  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setEditandoProducto({ ...prod });
  };

  const handleGuardarEdicion = async (id) => {
    setError("");
    if (!editandoProducto.nombre || !editandoProducto.id_categoria || !editandoProducto.descripcion || !editandoProducto.precio) {
      setError("Nombre, categoría, descripción y precio son obligatorios");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:3000/api/producto/${id}`, editandoProducto);
      setProductos(productos.map((p) => (p.id === id ? res.data : p)));
      setEditandoId(null);
      setEditandoProducto({});
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al actualizar producto");
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/producto/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al eliminar producto");
    }
  };

  return (
    <>
    <div><NavAdmin/></div>
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Administrar Productos</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Crear producto */}
      <div className="bg-gray-50 p-4 rounded-md mb-6 space-y-2 border">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={(e) => setNombre(e.target.value )}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="ID categoría"
          value={nuevoProducto.id_categoria}
          onChange={(e) => setidCategoria(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={(e) => setDescripcion(e.target.value )}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="URL Imagen"
          value={nuevoProducto.imagen}
          onChange={(e) => setlinkUrl(e.target.value )}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Personalización"
          value={nuevoProducto.personalizacion}
          onChange={(e) => setPersonalizacion(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Kg"
          value={nuevoProducto.kg}
          onChange={(e) => setKg(e.target.value )}
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={nuevoProducto.oferta}
            onChange={(e) => setoferta(e.target.checked )}
          />
          <span>Oferta</span>
        </div>
        <input
          type="number"
          placeholder="Descuento"
          value={nuevoProducto.descuento}
          onChange={(e) => setdescuento(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={() => handleCrear()}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Crear Producto
        </button>
      </div>

      {/* Lista de productos */}
      <ul className="space-y-4">
        {productos.map((prod) => (
          <li
            key={prod.id}
            className="border rounded-md p-4 flex justify-between items-start bg-white shadow-sm"
          >
            {editandoId === prod.id ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={editandoProducto.nombre}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, nombre: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  value={editandoProducto.id_categoria}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, id_categoria: parseInt(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editandoProducto.descripcion}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, descripcion: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  value={editandoProducto.precio}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, precio: parseFloat(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editandoProducto.imagen}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, imagen: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editandoProducto.personalizacion}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, personalizacion: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  value={editandoProducto.kg}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, kg: e.target.value })}
                  className="border p-2 rounded"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editandoProducto.oferta}
                    onChange={(e) => setEditandoProducto({ ...editandoProducto, oferta: e.target.checked })}
                  />
                  <span>Oferta</span>
                </div>
                <input
                  type="number"
                  value={editandoProducto.descuento}
                  onChange={(e) => setEditandoProducto({ ...editandoProducto, descuento: parseFloat(e.target.value) })}
                  className="border p-2 rounded"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleGuardarEdicion(prod.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1 w-full">
                <p className="font-bold text-lg">{prod.nombre}</p>
                <p>ID Categoría: {prod.id_categoria}</p>
                <p>{prod.descripcion}</p>
                <p className="font-semibold">Precio: ${prod.precio}</p>
                {prod.imagen && <img src={prod.imagen} alt={prod.nombre} className="w-24 h-24 object-cover rounded mt-2" />}
                {prod.personalizacion && <p>Personalización: {prod.personalizacion}</p>}
                {prod.kg && <p>Kg: {prod.kg}</p>}
                {prod.oferta && <p className="text-green-600 font-semibold">Oferta: {prod.descuento}%</p>}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditar(prod)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(prod.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default CrudProductos;