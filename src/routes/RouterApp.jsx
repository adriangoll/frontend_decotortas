import { Route, Routes } from "react-router-dom";
import Categorias from "../components/Categorias";
import MostrarLista from "../components/Productos" 
import Admin from "../Admin/Admin";
import Home from "../components/Home";
import Layout from "../components/Layout";
import CrudProductos from "../Admin/CrudProductos";
import CrudCategorias from "../Admin/CrudCategorias";
export  const RouterApp = ()=>{
    return(
        <>
        <Routes>
            <Route>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/productos" element={<CrudProductos/>}/>
                <Route path="/admin/categorias" element={<CrudCategorias/>}/>
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