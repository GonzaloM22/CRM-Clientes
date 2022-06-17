import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
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

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-blue-900 text-4xl">
        Ver Cliente: {cliente.nombre}
      </h1>
      <p className="mt-5">Información del Cliente</p>

      <p className="text-2xl tex-gray-500 mt-4">
        <span className=" text-gray-800 uppercase font-bold">Cliente:</span>
        {cliente.nombre}
      </p>
      <p className="text-2xl tex-gray-500 mt-4">
        <span className=" text-gray-800 uppercase font-bold">Email:</span>
        {cliente.email}
      </p>
      <p className="text-2xl tex-gray-500 mt-4">
        <span className=" text-gray-800 uppercase font-bold">Telefono:</span>
        {cliente.telefono}
      </p>
      <p className="text-2xl tex-gray-500 mt-4">
        <span className=" text-gray-800 uppercase font-bold">Empresa:</span>
        {cliente.empresa}
      </p>
      {cliente.notas && (
        <p className="text-2xl tex-gray-500 mt-4">
          <span className=" text-gray-800 uppercase font-bold">Notas:</span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
};

export default VerCliente;
