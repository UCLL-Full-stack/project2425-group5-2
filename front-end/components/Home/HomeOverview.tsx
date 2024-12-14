'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus } from 'lucide-react';

export default function HomeOverview() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check session storage for user login status
        const sessionUser = sessionStorage.getItem('loggedInUser');
        setIsLoggedIn(!!sessionUser); // If user exists, set as logged in
    }, []);

    const handleLogin = () => {
        router.push('/login'); // Redirect to login page
    };

    const handleRegister = () => {
        router.push('/register'); // Redirect to register page
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-secondary rounded-lg shadow-md overflow-hidden">
            <div className="px-8 py-10">
                {!isLoggedIn ? (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-black">
                            Get Started with TeamTrack
                        </h2>
                        <p className="text-xl text-gray-700">
                            Join our community of teams and start tracking your performance today!
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleLogin}
                                className="hover:shadow-md hover:shadow-neutral-400 flex items-center px-6 py-3 bg-primary text-black font-medium rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
                            >
                                <LogIn className="mr-2" size={20} />
                                Log In
                            </button>
                            <button
                                onClick={handleRegister}
                                className="hover:shadow-md hover:shadow-neutral-400 flex items-center px-6 py-3 bg-accent text-black font-medium rounded-md hover:bg-secondary-dark transition-all duration-300 transform hover:scale-105"
                            >
                                <UserPlus className="mr-2" size={20} />
                                Register
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
                        <p className="text-xl text-gray-600">Ready to manage your team?</p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center px-6 py-3 bg-primary text-black font-medium rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
