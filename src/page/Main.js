import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import '../App.css';
import App from '../App';
import Form from '../components/form'
import Header from "../components/header";

function Home() {
    return (
      <>
        <main>
          <App />
        </main>
        <nav>
          <Link to="/crear">Crear empleado</Link>
        </nav>
        <nav>
          <Link to="/listado">Ver listado</Link>
        </nav>
      </>
    );
}

function Main() {
    return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="listado" element={<App />} />
          <Route path="crear" element={<Form action='crear' />} />
          <Route path="editar" element={<Form action='editar' />} />
        </Routes>
      </div>
    );
  }

  export default Main