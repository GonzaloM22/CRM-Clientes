import React from 'react';
import Alerta from './Alerta';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const schemaCliente = Yup.object().shape({
    nombre: Yup.string()
      .required('El Nombre del Cliente es Obligatorio')
      .min(3, 'El nombre es muy corto')
      .max(30, 'El Nombre es muy Largo'),
    empresa: Yup.string().required('El Nombre de la Empresa es Obligatorio'),
    email: Yup.string()
      .required('El Email es Obligatorio')
      .email('Email Inválido'),
    telefono: Yup.number()
      .positive('Numero inválido')
      .typeError('Numero Inválido')
      .integer('Numero Inválido'),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        //Editanado registro
        const url = `http://localhost:4200/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        //Nuevo registro
        const url = 'http://localhost:4200/clientes';
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: { 'Content-Type': 'application/json' },
        });
      }
      await respuesta.json();
      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-10 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-900 text-xl uppercase font-bold text-center">
        {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>
      <Formik
        validationSchema={schemaCliente}
        initialValues={{
          //Si es "undefined" coloca ""
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}
        //Carga nuevamente el componente
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre:
                </label>
                <Field
                  className="mt-2 w-full p-3 bg-gray-50"
                  type="text"
                  id="nombre"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa:
                </label>
                <Field
                  className="mt-2 w-full p-3 bg-gray-50"
                  type="text"
                  id="empresa"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  E-mail:
                </label>
                <Field
                  className="mt-2 w-full p-3 bg-gray-50"
                  type="email"
                  id="email"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono:
                </label>
                <Field
                  className="mt-2 w-full p-3 bg-gray-50"
                  type="tel"
                  id="telefono"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  className="mt-2 w-full p-3 bg-gray-50 h-28"
                  type="text"
                  id="notas"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                className="mt-2 p-3 w-full bg-blue-800 text-white uppercase font-bold"
                type="submit"
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

//En caso de no encontrar los props, entran los default props
Formulario.defaultProps = { cliente: {}, cargando: false };

export default Formulario;
