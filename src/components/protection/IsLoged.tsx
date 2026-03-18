import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export interface IsLogedProps {
    Chiledren: React.FC;
}

const IsLoged: React.FC<IsLogedProps> = ({ Chiledren }) => {
    const [token, setToken] = useState<string | null>(null)
    const navigator = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token)
    }, [])
    return (
        <>
            {token ? <Chiledren /> : navigator('/login')}
        </>
    )
}

export default IsLoged