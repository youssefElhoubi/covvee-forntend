import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export interface IsLogedProps {
    Chiledren: React.FC;
}

const IsUser: React.FC<IsLogedProps> = ({ Chiledren }) => {
    const [isUser, setisUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigator = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const decodedUser = jwtDecode<{ roles?: string[] }>(user);
        if (decodedUser?.roles?.includes('ROLE_USER')) {
            setisUser(true);
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
            {isUser && <Chiledren />}
        </div>
    )
}

export default IsUser