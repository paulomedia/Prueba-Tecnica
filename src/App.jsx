import './App.css';
import List from './components/list';
import { useContext, useEffect, useState } from "react";
import { deleteUser, getAll} from './services'
import { StateContext, UserContext } from './context/context';

function App() {
  const [done, setDone] = useState(false)
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  const {users, setUsers} = useContext(UserContext)
  const {alreadyLoaded, setLoaded} = useContext(StateContext)

  useEffect(() => {
    if(!alreadyLoaded) {
      getAll()
      .then(items => {
        setItems(items.data)
        setDone(true)
        setUsers(items.data)
        setLoaded(true)
      },error => setMessage('No ha sido posible presentar los datos, intente otra vez'))
    }
  }, []);

  const handleEditar = e => {
    console.log('HandlerEditar --> ');
  }

  const handleEliminar = e => {
    const { value } = e.target

    deleteUser(value)
    .then(response => {
      if(response.status === 'success') {
        setUsers(users.filter(user => user.id !== Number(value)))
        setMessage(response.message)
      }
    },error => setMessage('No ha sido posible eliminar el registro, intente otra vez'))
  }

  return (
      <div className='App'>
        <div className='titulo'>
           <h3>Lista de empleados</h3>
           <p className='message'>{ message }</p>
        </div>
        <div className='lista'>
        {(done || alreadyLoaded) && (items || users) ?
        (
        <List
          data={alreadyLoaded ? users : items} 
          handleEditar={ handleEditar }
          handleEliminar={ handleEliminar }
        />
        ) : (
          <p>Cargando resultados...</p>
        )}
        </div>
      </div>
    )
}

export default App;
