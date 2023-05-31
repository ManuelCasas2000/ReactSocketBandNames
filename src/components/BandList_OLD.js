import React, { useEffect, useState } from 'react'

export const BandList = ({data, votar, borrar, cambiarNombre}) => {

    const [bands, setBands] = useState(data);

    useEffect(() => {
        setBands(data);
    },[data])

    const cambioNombre = (event, id) => {
        // console.log(event.target.value, " - ", id);
        const nuevoNombre = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = nuevoNombre;
            }
            return band;
        }));
    }

    const onPerdioFoco = (id, nombre) => {
        // console.log(id, ' - ', nombre);
        cambiarNombre(id, nombre);
        // TODO: Disparar el evento de sockets 
        // CambiarNombre 'cambiar-nombre-banda'
    }

    const crearRows = () => {
        return (
            bands.map(band => (
                <tr key={ band.id }>
                    <td>
                        <button 
                            className='btn btn-secondary'
                            onClick={() => votar(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        <input 
                            className='form-control'
                            value={band.name}
                            onChange={(event) => cambioNombre(event, band.id)}
                            onBlur={() => onPerdioFoco(band.id, band.nombre)} // onBlur: Cuando pierde el foco
                        />
                    </td>
                    <td><h3>{band.votes}</h3></td>
                    <td>
                        <button 
                            className='btn btn-danger'
                            onClick={() => borrar(band.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            ))
        )
    }

  return (
    <>
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {crearRows()}
            </tbody>
        </table>
    </>
  )
}
