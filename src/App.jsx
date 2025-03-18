import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

//Props ->Propiedades - para pasar variables o funciones de otros componentes
//Ejemplo - <Header nombreProp= {datos o Funciones}/>

function App() {
  // const[pacientes , setPacientes]= useState([]);
  // const [paciente, setPaciente] = useState({});

  const [pacientes, setPacientes] = useState(() =>
    JSON.parse(localStorage.getItem('pacientes')) || []);
    const[paciente, setPaciente]= useState({});

 /*  useEffect(() => {
    const obtenerLS=() => {
      const pacientesLS =  JSON.parse(localStorage.getItem('Pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS()
  }, [])
 */
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])

  const eliminarPaciente = (id) =>{
    //console.log('Eliminando paciente', id)
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }
  return (
    // Toda etiqueta debe tener un cierre 
    //Fragment <>, </>
    <div className="container mx-auto mt-20"> 
      <Header/>

      <div className="mt-12 md:flex">
      <Formulario
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}

      />
      <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
      </div>
    </div>
  )
}

export default App
