import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';
import { useEffect, useState } from "react";
import { getUser } from '../../services';
import PropTypes from 'prop-types';

function List(props){
  const [users, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState({});
  const { data } = props;

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(values => ({...values, [name]: value}));
  }

  const resetValues = obj => {
    for(let key in obj) setInputs(values => ({...values, [key]: ''}));
  }

  const mostrarDetalle = e => {
    const { value } = e.target;
    setOpen(true);

    getUser(value).then(response => {
      if(response.status === 'success') {
        const { data } = response;

        for(let key in data) setInputs(values => ({...values, [key]: data[key]}));
        setMessage(response.message);
      }
  },error => { 
    setMessage('No ha sido posible cargar el registro, intente otra vez');
    resetValues(inputs);
  })
  }

  const ocultarDetalle = () => {
    setOpen(false);
  }

  return (
   <>
     <Container>
        <br />
        <Link className='boton verde'
            to={'/crear'}>Crear
        </Link>
        <br /><br />
        <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(item => (
            <tr key={`employee_`+item.id}>
                <td>{item.id}</td>
                <td>{item.employee_name}</td>
                <td>{item.employee_age}</td>
                <td>
                <Link className='boton azul' id={item.id} 
                    to={`/editar?id=${item.id}&username=${item.employee_name}&age=${item.employee_age}&salary=${item.employee_salary}`}>Editar
                </Link>{'  '}
                <Button value={item.id} color='danger' onClick={props.handleEliminar}>Eliminar</Button>{'  '}
                <Button value={item.id} color='success' onClick={mostrarDetalle}>Detalle</Button>
                </td>
            </tr>
          ))}
        </tbody>
    </Table>
   </Container>

   <Modal isOpen={open}>
      <ModalHeader>
        <div>
          <h3>Detalle empleado</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <label>Id</label>
          <input className='form-control' readOnly type="text" value={inputs.id || ""}/>
        </FormGroup>

        <FormGroup>
          <label>Name</label>
          <input className='form-control' name="name" type="text" onChange={handleChange} value={inputs.employee_name || ""}/>
        </FormGroup>

        <FormGroup>
          <label>Age</label>
          <input className='form-control' name="age" type="number" onChange={handleChange} value={inputs.employee_age || ""}  />
        </FormGroup>

        <FormGroup>
          <label>Salary</label>
          <input className='form-control' name="salary" type="number" onChange={handleChange} value={inputs.employee_salary || ""}/>
        </FormGroup>

        <FormGroup>
          <label>Profile</label>
          <input className='form-control' name="profile-image" type="text" onChange={handleChange} value={inputs.profile_image || ""}/>
        </FormGroup>

        <FormGroup>
          <label>{message}</label>
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="success" onClick={()=>ocultarDetalle()}>Salir</Button>
      </ModalFooter>
   </Modal>
   </>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    employee_name: PropTypes.string,
    employee_age: PropTypes.number,
    employee_salary: PropTypes.number,
    profile_image: PropTypes.string
  })),
  handleEliminar: PropTypes.func
}
  
export default List;