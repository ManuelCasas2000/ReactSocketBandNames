import React, { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext(); // Con esto creo mi Context

export const SocketProvider = ({children}) => { // El provider me ayuda a colocar información a lo largo de toda la aplicación

    const {socket, online} = useSocket('http://localhost:8080');
    // value={{socket, online}} es lo que quiero compartir en toda la aplicación
    return (
        <SocketContext.Provider value={{socket, online}}> 
            {children}
        </SocketContext.Provider>
    )
}

