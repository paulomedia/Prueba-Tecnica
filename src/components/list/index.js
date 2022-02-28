import './list.css';
import { Link } from "react-router-dom";

const List = props => {
    const { data } = props
    return (
    <ul>
      {
        data.map(item => {
          return (
             <li key={`user_`+item.id}>
              {/*<Employee item={item} />*/}
               <div><span>{item.id}</span></div>
               <div><span>{item.employee_name}</span></div>
               <span>{item.employee_age}</span>
               <span>{item.employee_salary}</span>
               <span>{item.profile_image}</span>
              {/*
              */}
              <button value={item.id} onClick={props.handleEditar}>Editar</button>
              <button value={item.id} onClick={props.handleEliminar}>Eliminar</button>
               <nav>
                 <Link id={item.id} to={`/editar?id=${item.id}&username=${item.employee_name}&age=${item.employee_age}&salary=${item.employee_salary}`}>Editar</Link>
               </nav>
             </li>
          )
        })
      }
    </ul>
    )
}

export default List