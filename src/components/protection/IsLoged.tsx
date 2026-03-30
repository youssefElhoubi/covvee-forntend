import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export interface IsLogedProps {
    children: React.ReactNode;
}

const IsLoged: React.FC<IsLogedProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)
    const navigator = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token)
    }, [])
    return (
        <>
            {token ? children  : navigator('/login')}
        </>
    )
}

export default IsLoged