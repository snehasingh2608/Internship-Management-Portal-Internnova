import React, { useState, useEffect } from 'react';

const Greeting = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get user data from localStorage or context
        const getUserData = () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserData();

        // Listen for storage changes (updates after login)
        const handleStorageChange = () => {
            getUserData();
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Also check for direct updates in same tab
        const interval = setInterval(getUserData, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48"></div>
            </div>
        );
    }

    const getGreetingMessage = () => {
        const hour = new Date().getHours();
        let timeGreeting = 'Hello';
        
        if (hour < 12) {
            timeGreeting = 'Good morning';
        } else if (hour < 17) {
            timeGreeting = 'Good afternoon';
        } else {
            timeGreeting = 'Good evening';
        }

        const userName = user?.name || 'User';
        return `${timeGreeting}, ${userName} 👋`;
    };

    return (
        <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {getGreetingMessage()}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
                Welcome back to your dashboard
            </p>
        </div>
    );
};

export default Greeting;
