import { useState } from "react";

function Form(props) {
    const [inputs, setInputs] = useState({});

    const handleChange = event => {
        // Todo llamar al metodo que se pase por props
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = () => {
        // Todo llamar al metodo que se pase por props
    }

    return(
        <form onSubmit={ handleSubmit }>
            <label>Enter your name:
            <input
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={ handleChange }
            />
            </label>
            <label>Enter your age:
            <input
                type="number"
                name="age"
                value={inputs.age || ""}
                onChange={ handleChange }
            />
            </label>
            <label>Enter your salary:
            <input
                type="number"
                name="salary"
                value={inputs.salary || ""}
                onChange={ handleChange }
            />
            </label>
            <input type="submit" />
        </form>
    )
}

export default Form
