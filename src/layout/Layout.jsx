import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const urlActual = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-4 py-10">
        <h2 className="text-center text-white text-4xl font-black">
          CRM - Clientes
        </h2>
        <nav className="mt-10">
          <Link
            className={` ${
              urlActual === '/clientes' ? 'text-blue-300' : 'text-white'
            }   text-2xl mt-2 hover:text-blue-300 block`}
            to="/clientes"
          >
            Clientes
          </Link>

          <Link
            className={`${
              urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'
            }  text-2xl mt-2 hover:text-blue-300 block`}
            to="/clientes/nuevo"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div className="md:h-screen  md:w-3/4 p-10 overflow-scroll overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
