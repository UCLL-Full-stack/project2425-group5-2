'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus } from 'lucide-react';
import { User } from 'types';

export default function HomeOverview() {
    const [loggedInUser, setLoggedInUser] = useState<User>(null);
    const router = useRouter();

    useEffect(() => {
            const user = sessionStorage.getItem('loggedInUser');
            if (user) {
                const parsedUser = JSON.parse(user);
                setLoggedInUser(parsedUser);
            }
        }, []);

    const handleLogin = () => {
        router.push('/login');
    };

    const handleRegister = () => {
        router.push('/register');
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-secondary rounded-lg shadow-md overflow-hidden">
            <div className="px-8 py-10">
                {!loggedInUser ? (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-black">
                            Get Started with TeamTrack
                        </h2>
                        <p className="text-xl text-gray-700">
                            Join our community of teams and start tracking your performance today!
                        </p>
                        <div className="flex space-x-4">
                        <table className="w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Password</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="">
                                admin@teamtrack.be
                            </td>
                            <td>
                                Admin123!
                            </td>
                            <td>
                                admin
                            </td>
                        </tr>
                        <tr>
                            <td className="">
                                bobpeeters@teamtrack.be
                            </td>
                            <td>
                                Bob123!
                            </td>
                            <td>
                                coach
                            </td>
                        </tr>
                        <tr>
                            <td className="">
                                waynerooney@teamtrack.be
                            </td>
                            <td>
                                Wayne123!
                            </td>
                            <td>
                                player
                            </td>
                        </tr>
                    </tbody>
                </table>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
                        <p className="text-xl text-gray-600">Ready to manage your team?</p>
                    </div>
                )}
            </div>
        </div>
    );
}
