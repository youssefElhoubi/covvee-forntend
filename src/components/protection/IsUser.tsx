import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import type { IsLogedProps } from './IsLoged';

type JwtPayload = {
    roles?: string[];
    exp?: number;
};

const IsUser: React.FC<IsLogedProps> = ({ children }) => {
    const [isUser, setIsUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            // ❌ no token → redirect
            if (!token) {
                navigator('/login');
                return;
            }

            const decodedUser = jwtDecode<JwtPayload>(token);

            // ✅ check expiration
            const currentTime = Date.now() / 1000; // seconds

            if (!decodedUser.exp || decodedUser.exp < currentTime) {
                localStorage.removeItem('token'); // optional cleanup
                navigator('/login');
                return;
            }

            // ✅ check role
            if (decodedUser.roles?.includes('ROLE_USER')) {
                setIsUser(true);
            } else {
                navigator('/login');
            }

        } catch (error) {
            // ❌ invalid token
            localStorage.removeItem('token');
            navigator('/login');
        } finally {
            setIsLoading(false);
        }
    }, [navigator]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{isUser && children}</>;
};

export default IsUser;