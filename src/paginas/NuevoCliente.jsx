import Formulario from '../components/Formulario';

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-black text-blue-900 text-4xl">Nuevo Cliente</h1>
      <p className="mt-5">
        Llena los siguientes campos para registrar un cliente
      </p>
      <Formulario />
    </>
  );
};

export default NuevoCliente;
