import { Route, Routes } from "react-router-dom";
import Categorias from "../components/Categorias";
import MostrarLista from "../components/Productos" 
import Admin from "../Admin/Admin";
import Home from "../components/Home";
import Layout from "../components/Layout";
import CrudProductos from "../Admin/CrudProductos";
import CrudCategorias from "../Admin/CrudCategorias";
import { Navigate } from "react-router-dom";
import LoginAdmin from "../Admin/LoginAdmin";
import CrudUsuario from "../Admin/CrudUsuario";

function PrivateRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" />;
}

export  const RouterApp = ()=>{
    return(
        <>
        <Routes>
            <Route>
                <Route path="/admin/login" element={<PrivateRoute><LoginAdmin/></PrivateRoute>}/>
                <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>}/>
                <Route path="/admin/usuarios" element={<PrivateRoute><CrudUsuario/></PrivateRoute>}/>
                <Route path="/admin/productos" element={<PrivateRoute><CrudProductos/></PrivateRoute>}/>
                <Route path="/admin/categorias" element={<PrivateRoute><CrudCategorias/></PrivateRoute>}/>
            </Route>
            <Route path="/" element={<Layout/>}>
                <Route path="/categorias" element={<Categorias/>}/>
                <Route index element={<Home/>}/>
                <Route path="/productos" element={<MostrarLista/>}/>
            </Route>
        </Routes>

        </>
    );
};