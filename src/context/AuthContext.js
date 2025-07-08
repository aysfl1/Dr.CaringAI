import React, { createContext, useState, useContext } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
    // Set a default admin user - this is a client-side only implementation
    const [user] = useState({
        id: 1,
        full_name: 'Admin User',
        email: 'admin@example.com',
        role: 'Admin',
        name: 'Admin'
    });
    const [loading] = useState(false);
    const [error] = useState(null);

    // Client-side only login function (no server calls)
    const login = async (username, password) => {
        // No actual login needed, we're already "logged in"
        return user;
    };

    // Client-side only logout function (no server calls)
    const logout = () => {
        // No need to do anything, we stay "logged in"
        console.log("Logout attempted, but we're keeping you logged in for easy admin access");
    };

    // Auth context value
    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: true, // Always authenticated in this client-side only implementation
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 