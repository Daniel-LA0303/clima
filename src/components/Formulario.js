import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    //STATES START
    const [error, guardarError] = useState(false); //STATE PARA LA VALIDACIÓN
    //STATES END

    //DESTRUCTION DEL OBJETO START
    const { ciudad, pais} = busqueda; 
    //DESTRUCTION DEL OBJETO END

    //FUNCIONES START

    //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
    const handleChange = e => {
        //ACTUALIZAR EL STATE
        guardarBusqueda({
            ...busqueda, //COPIA DEL STATE
            [e.target.name] : e.target.value  //PASAMOS EL VALOR
        });
    }

    //FUNCION CUANDO EL USUARIO HACE SUBMIT EN EL FORM
    const handleSubmit = e => {
        e.preventDefault();
         
        //VALIDAR
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //PASARLO AL COMPONENTE PRINCIPAL
        guardarConsultar(true);
    }

    //FUNCIONES END

    return (  
        <form onSubmit={handleSubmit //CUANDO EL USUARIO HACE CLICK EN EL SUBMIT
        }> 
            {error 
                ? 
                    <Error mensaje='Todos los campos son obligatorios'/>
                : 
                    null
            }

            <div className='input-field col s12'>
                <input
                    type="text"
                    name='ciudad'
                    id='ciudad'
                    value={ciudad} //UNA VEZ ELEGIDO POR EL USUARIO EL VALOR SE QUEDA EN EL INPUT
                    onChange={handleChange} //HACEMOS LLAMADA A LA FUNCION
                />
                <label htmlFor='ciudad'>Ciudad :</label>
            </div>
            <div className='input-field col s12'>
                <select
                    name='pais'
                    id='pais'
                    value={pais} //UNA VEZ ELEGIDO POR EL USUARIO EL VALOR SE QUEDA EN EL INPUT
                    onChange={handleChange} //HACEMOS LLAMADA A LA FUNCION
                >
                    <option value=''>--Seleccione un país--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor='pais'>País: </label>
            </div>
            <div className='input-field col s12'>
                <input 
                    type='submit'
                    value='Buscar Clima'
                    className='waves-effect waves-light btn-large btn-block yellow'
                />
            </div>
        </form>

    );
}
 
export default Formulario;