import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

    //STATES START
    const [busqueda, guardarBusqueda] = useState({ //STATE DEL FORMULARIO
      ciudad: '',
      pais: ''
    })

    const [consultar, guardarConsultar] = useState(false); //CONSULTA DEL API
    const [resultado, guardarResultado] = useState({}); //STATE QUE ALMACENA EL RESULTADO DE LA API
    const [error, guardarError] = useState(false); //STATE PARA CUANDO EL USUARIO DA INFORMACIOJN ERRONEA
    //STATES END

    //DESTRUCTION DEL OBJETO START
    const { ciudad, pais} = busqueda; 
    //DESTRUCTION DEL OBJETO END
    
    //USEEFECT START
    useEffect(() => {
      // console.log(ciudad);
      const consultarAPI = async () => {
        if(consultar){
          const appId = 'e3ca0bfb3931429c58d0c27a225d6254';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

          const respuesta = await fetch(url);
          const resultadoAPI = await respuesta.json();

          guardarResultado(resultadoAPI); //PASAMOS LA CONSULTA DE LA API AL STATE
          guardarConsultar(false);

          //VALIDACION DE ERROR
          if(resultadoAPI.cod === '404'){
            guardarError(true);
          }else{
            guardarError(false)
          }
        }
      }

      consultarAPI();
    }, [consultar])
    //USEEFECT END

    let componente;
    if(error){
      componente = <Error mensaje='No hay resultados'/>
    }else{
      componente =<Clima resultado = {resultado}/>
    }



  return (
    <Fragment>
      <Header
        titulo='Clima React APP'
      ></Header>
      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
            <div className='col m6 s12'>
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar = {guardarConsultar}
              ></Formulario>
            </div>
            <div className='col m6 s12'>
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
