import './App.css';
import { useContext, useEffect, useState } from "react";
import List from './components/list'
import { deleteUser, fetchAllUsers} from './services'

function App() {
  const [done, setDone] = useState(false)
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchAllUsers()
    .then(users => {
      console.log('Data --> ',users.data)
      setItems(users.data)
      setDone(true)
    },error => setMessage(error.message))
  },[]);

  const handleEditar = e => {
    console.log('HandlerEditar --> ')
  }

  const handleEliminar = e => {
    const { value } = e.target

    deleteUser(value)
    .then(response => {
      //console.log('Response --> ',response, response.status, response.message)
      if(response.status) {
        setMessage(response.message)
      }
    },error => setMessage(error.message))
  }

  return (
      <div className='App'>
        <div className='titulo'>
           <h3>Lista de empleados</h3>
        </div>
        <div className='lista'>
        {done && items ?
        (
        <List 
          data={items} 
          handleEditar={ handleEditar }
          handleEliminar={ handleEliminar }
        />
        ) : (
          <p>Cargando resultados...</p>
        )}
        </div>
        <p>{ message }</p>
      </div>
    )
}

export default App;
