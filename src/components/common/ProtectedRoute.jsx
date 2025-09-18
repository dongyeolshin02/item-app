import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '../../store/Auth';

function ProtectedRoute({children}) {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;