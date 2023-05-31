import React, { useContext, useState } from 'react'
// import { useSocket } from '../hooks/useSocket';
import { SocketContext } from '../context/SocketContext';

// export const BandAdd = ({crearBanda}) => {
export const BandAdd = () => {

  const [valor, setValor] = useState('');
  // const {socket} = useSocket('http://localhost:8080');
  const {socket} = useContext(SocketContext);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if(valor.trim().length > 0) {
      console.log(valor)
      // TODO
      socket.emit('nueva-banda', {nombre: valor});
      // crearBanda(valor);
      setValor(''); // Para volver a empezar
    }
  }

  return (
    <>
        <h3>Agregar Banda</h3>
        <form onSubmit={onSubmit}>
            <input
                className='form-control'
                placeholder='Nuevo nombre de tabla'
                value={valor}
                onChange={(ev) => setValor(ev.target.value) }
            />
        </form>
    </>
  )
}
