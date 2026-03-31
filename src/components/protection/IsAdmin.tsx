import React, { useEffect, useState } from 'react'
import type { IsLogedProps } from './IsLoged'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const IsAdmin: React.FC<IsLogedProps> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const user = localStorage.getItem('token') || 'null';
            if (!user || user === 'null') {
                navigate('/login');
            }
            const decodedUser = jwtDecode<{ roles?: string[] }>(user);
            if (decodedUser?.roles?.includes('ROLE_ADMIN')) {
                setIsAdmin(true);
            } else {
                navigate('/login');
            }
        } catch (error) {
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return <>{isAdmin && children}</>;
};

export default IsAdmin;