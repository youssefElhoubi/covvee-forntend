import React, { useEffect, useState } from 'react'
import type { IsLogedProps } from './IsLoged'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const IsAdmin: React.FC<IsLogedProps> = ({ Chiledren }) => {
     const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigator = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const decodedUser = jwtDecode<{ roles?: string[] }>(user);
        if (decodedUser?.roles?.includes('ROLE_ADMIN')) {
            setIsAdmin(true);
        } else {
            navigator('/login');
        }
        setIsLoading(false);
    }, [navigator])
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    
    return (
        <div>
            {isAdmin && <Chiledren />}
        </div>
    )
}

export default IsAdmin