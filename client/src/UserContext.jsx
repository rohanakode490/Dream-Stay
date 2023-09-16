import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null) //user data
    const [ready, setReady] = useState(false) //for account page to render after user data is fetched after useEffect. Without this the page will navigate to /login.

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setReady(true)
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}