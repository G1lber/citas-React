//rfce para mas rapido lo auto completa y hace la funcion
//El estado de la aplicacion 'Una variable con informacion del aplicativo'
import { useState , useEffect} from 'react';
import Error from './Error';
/*useEffect 
  import{useEffect} from 'react';

  useEffect( () =>{
    console.log('El componente esta listo');
    }, [])
*/
/* const [cliente, setCliente] = useState({});
   const [total setTotal] = useState(0);
   const [cliente, setCliente] = useState([]);
   const [modal, setModal] = useState(false);
   */

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  
  const [error , setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(18).substring(2);
    const fecha = Date.now().toString(17)

    return random + fecha
  }

  const handleSumit =(e)=>{
    e.preventDefault();

    //Validacion del Formulario

    if ([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay al menos un campo vacio')
      setError(true)
      return;
    }
    setError(false)

    //objeto Paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
      id: generarId()
    }

    if (paciente.id) {
      objetoPaciente.id=paciente.id
      //Editando Registro
      console.log(objetoPaciente)
      console.log(paciente)
      
      //Detecta que es el mismo id
      const pacientesActualizados = pacientes.map ( pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        setPaciente({})
    }else{
      //Nuevo registro
      objetoPaciente.id=generarId()
      setPacientes([...pacientes, objetoPaciente])
    }
    // console.log(objetoPaciente)
    // setPacientes([...pacientes, objetoPaciente])

    //Reiniciar el formulario

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
          Añade Paciente y {' '}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
        <form 
          onSubmit={handleSumit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
          
          {error && 
            <Error>
              <p>Todos los campos son obligatorios</p>
              </Error> 
          }
          <div className="mt-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Macota</label>

            <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>

            <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>

            <input 
            id="email"
            type="text" 
            placeholder="Email de Contacto Propietario"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>

            <input 
            id="alta"
            type="date" 
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
            <textarea 
              id="sintomas"
              className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
              placeholder="Describe los Síntomas"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>
          
          <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors mt-5 rounded-md"
            value={ paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
          />
        </form>
    </div>
  )
}

export default Formulario


