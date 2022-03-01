import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import '../App.css';
import App from '../App';
import Form from '../components/form'
import Header from "../components/header";
import { StateContext, UserContext } from "../context/context";

function Home() {
    return (
      <>
        <main>
          <App />
        </main>
      </>
    );
}

function Main() {
    const [users, setUsers] = useState([]);
    const [alreadyLoaded, setLoaded] = useState(false);

    return (
      <div className="App">
        <Header/>
        <UserContext.Provider value={{ users, setUsers }}>
        <StateContext.Provider value={{alreadyLoaded, setLoaded}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="listado" element={<App />} />
          <Route path="crear" element={<Form action='crear' />} />
          <Route path="editar" element={<Form action='editar' />} />
        </Routes>
        </StateContext.Provider>
        </UserContext.Provider>
      </div>
    );
  }

  export default Main;