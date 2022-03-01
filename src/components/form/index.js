import { createUser, updateUser } from '../../services';
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import './form.css';
import { UserContext } from '../../context/context';

function Form(props) {
    const { action } = props;
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams([]);
    const {users, setUsers} = useContext(UserContext);
    
    useEffect(() => {
        if(action === 'editar') {
            let inputData = {
                id: searchParams.get('id'),
                username: searchParams.get('username'),
                age: searchParams.get('age'),
                salary: searchParams.get('salary')
            }
            for(let key in inputData) setInputs(values => ({...values, [key]: inputData[key]}))
        }
    }, []);

    const handleChange = e => {
        const { name, value } = e.target
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        const { age, id, salary, username } = inputs

        let dataToSend = {
            employee_name: username,
            employee_age: Number(age),
            employee_salary: Number(salary),
            profile_image: '-'
        }
        
        switch(action) {
            case 'crear':
                createUser(dataToSend).then(response => {  
                    if(response.status === 'success') {
                        setUsers([...users, {...dataToSend, id: response.data.id}])
                        setMessage(response.message)
                    } 
                },error => setMessage('No ha sido posible crear el registro, intente otra vez'))
            break

            case 'editar':
                const idNumber = Number(id);
                dataToSend = {...dataToSend, id:idNumber};
                updateUser(dataToSend).then(response => {
                    if(response.status === 'success') {
                        setUsers(users.map(user => (user.id === dataToSend.id ? dataToSend : user)))
                        setMessage(response.message)
                    }
                },error => setMessage('No ha sido posible actualizar el registro, intente otra vez'))
            break
        }
    }

    return (
        <div>
        <h5>{`${action} empleado`}</h5>
        <div className='form-wrapper'>    
        <form className='form' onSubmit={ handleSubmit }>
            <div className='input-group'>
              <label className='label' >Name</label>
                <input 
                  className='input'
                  type="text" 
                  name="username" 
                  value={ inputs.username || "" } 
                  onChange={ handleChange } 
                  placeholder='Enter your name'
                />
            </div>
            <div className='input-group'>
              <label className='label'>Age</label>
                <input 
                  className='input'
                  type="number"
                  name="age"
                  value={ inputs.age || "" }
                  onChange={ handleChange }
                  placeholder='Enter your age'
                />
            </div>
            <div className='input-group'>
              <label className='label'>Salary</label>
                <input 
                  className='input'
                  type="number"
                  name="salary"
                  value={inputs.salary || ""}
                  onChange={ handleChange }
                  placeholder='Enter your salary'
               />
            </div>
            <input className='input-group-submit' type="submit" value={ props.action } />
            <p className='form-message'>{ message }</p>
        </form>
        </div>
        </div>
    )
}

Form.propTypes = {
    action: PropTypes.string
}

export default Form;
