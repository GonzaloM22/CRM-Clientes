import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario';

const EditarCliente = () => {
  const { id } = useParams();

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const url = `http://localhost:4200/clientes/${id}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }

      setCargando(!cargando);
    };
    obtenerCliente();
  }, []);

  return (
    <>
      <h1 className="font-black text-blue-900 text-4xl">Editar Cliente</h1>
      <p className="mt-5">
        Utiliza este formulario para editar datos de un cliente
      </p>

      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>Cliente ID no válido</p>
      )}
    </>
  );
};

export default EditarCliente;
