import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = ( serverPath) => { 
    const socket = useMemo(() => io.connect(serverPath,{  // Con este useMemo, sólo se llama al socket si cambia serverPath
            transports: ['websocket']
        }),[serverPath]);

    const [online, setOnline] = useState(false);

    useEffect(() => {
        // console.log(socket.connected);
        setOnline(socket.connected);
      }, [socket])
    
      // Ahora quiero que cuando el servidor se conecta/ desconecta automaticamente cambie el simbolo en la pantalla sin necesidad de refrescar
    useEffect(() => {
        socket.on('connect', () => {
        setOnline(true);
        })
    }, [socket])
    
    useEffect(() => {
    socket.on('disconnect', () => {
        setOnline(false);
    })
    }, [socket])

      return {
        online,
        socket,
      };
}
