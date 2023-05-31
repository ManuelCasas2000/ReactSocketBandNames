import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

// export const BandList = ({ data, votar, borrar, cambiarNombre }) => {
export const BandList = () => {

    // const [ bands, setBands ] = useState(data);
    const [ bands, setBands ] = useState([]);
    const {socket} = useContext(SocketContext);

    // useEffect(() => {
    //     setBands( data );
    // }, [ data ])

    useEffect(() => {
        socket.on('current-bands', (bands) => {
                setBands(bands);
        })
        return () => socket.off('current-bands'); // Esto se lanza cuando se desmonta el useEffect
    }, [ socket ])


    const cambioNombre = ( event, id ) => {
        const nuevoNombre = event.target.value;
        
        setBands( bands => bands.map( band =>{
            if ( band.id === id ) {
                band.name = nuevoNombre;
            }
            return band;
        }));
    }

    const onPerdioFoco = (id, nombre) => {
        // TODO: Disparar el evento de sockets
        socket.emit('cambiar-nombre-banda', {id, nombre});
        // cambiarNombre( id, nombre );
    }

    const votar = ( id ) => {
        socket.emit('votar-banda', id); // Mando como argumento unicamente el id de la banda
    }

    const borrarBanda = ( id ) => {
        socket.emit('borrar-banda', id);
    }


    const crearRows = () => {
        return (
            bands.map( band => (
                <tr key={ band.id }>
                    <td> 
                        <button 
                            className="btn btn-primary"
                            onClick={ () => votar( band.id ) }
                        > +1 </button>
                    </td>
                    <td>
                        <input 
                            className="form-control"
                            value={ band.name }
                            onChange={ (event) => cambioNombre( event, band.id ) }
                            onBlur={ () => onPerdioFoco( band.id, band.name ) }
                        />
                    </td>
                    <td> <h3> { band.votes } </h3> </td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick={ () => borrarBanda( band.id ) }
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            ))
        );
    }


    return (
        <>

            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    { crearRows() }
                </tbody>
            </table>

        </>
    )
}
