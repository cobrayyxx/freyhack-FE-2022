import React, { createContext, useState } from 'react'

export const UserContext = createContext();
export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [token, setToken] = useState();
    const data = {
        currentUser,
        setCurrentUser,
        token,
        setToken
    }

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )
}