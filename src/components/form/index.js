import { createUser, updateUser } from '../../services'
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import PropTypes from 'prop-types'
import './form.css'

function Form(props) {
    const [inputs, setInputs] = useState({})
    const [message, setMessage] = useState([])
    const [searchParams, setSearchParams] = useSearchParams([])

    useEffect(() => {
        const { action } = props

        if(action === 'editar') {
            const inputData = {
                id: searchParams.get('id'),
                username: searchParams.get('username'),
                age: searchParams.get('age'),
                salary: searchParams.get('salary')
            }
            for(let key in inputData) setInputs(values => ({...values, [key]: inputData[key]}))
        }
    },[]);

    const handleChange = e => {
        const { name, value } = e.target
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        const { action } = props

        switch(action) {
            case 'crear':
                console.log('handleSubmit CREAR --> ')
                createUser({
                    employee_name: inputs.username,
                    employee_age: inputs.age,
                    employee_salary: inputs.salary  
                }).then(response => {  if(response.status === 'success') setMessage(response.message)
                },error => setMessage(error.message))
            break

            case 'editar':
                console.log('handleSubmit EDITAR --> ', inputs)
                updateUser({
                    id: inputs.id,
                    employee_name: inputs.name,
                    employee_age: inputs.age,
                    employee_salary: inputs.salary  
                })
                .then(response => {
                console.log('Response --> ',response, response.status, response.message)
                    if(response.status) {
                        setMessage(response.message)
                        // TODO Guarda registro en el Hook de contexto
                    }
                },error => setMessage(error.message))
            break
        }

    }

    return (
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
    )
}

Form.propTypes = {
    action: PropTypes.string
}

export default Form
