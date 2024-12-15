import React, { useEffect, useState } from 'react';
import PlayerService from '@services/PlayerService';
import TeamService from '@services/TeamService';
import { User } from '../../types';
import { ArrowLeft, Square, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/router';
import UserService from '@services/UserService';

type Props = {
    loggedInUser: User;
    handleLogout: () => void;
};

const ProfileEditor: React.FC<Props> = ({ loggedInUser, handleLogout }) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [firstName, setFirstName] = useState<string>(loggedInUser.firstName);
    const [lastName, setLastName] = useState<string>(loggedInUser.lastName);
    const [email, setEmail] = useState<string>(loggedInUser.email);
    const [phoneNumber, setPhoneNumber] = useState<string>(loggedInUser.phoneNumber);

    const router = useRouter();

    const handleUpdateUser = async () => {
        const validationErrors: string[] = [];

        if (!firstName) {
            validationErrors.push('First name is required');
        }

        if (!lastName) {
            validationErrors.push('Last name is required');
        }

        if (!phoneNumber) {
            validationErrors.push('Phone number is required');
        }
        
        if (!email)

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!loggedInUser.id) return;

        const updatedUser: User = {
            id: loggedInUser.id,
            firstName,
            lastName,
            email,
            phoneNumber,
        };

        await UserService.updateUser(updatedUser);
        handleLogout();
    };

    const goBack = () => {
        router.push(`/profile/${loggedInUser.id}`);
    };

    return (
        <div className="bg-gradient-to-br from-primary to-accent text-text p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
                <button
                    onClick={goBack}
                    className="p-2 bg-secondary hover:bg-red-500 text-white rounded-full transition-all duration-300 transform hover:scale-110"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-grow text-center">
                    <h1 className="text-4xl font-extrabold mb-2 text-white tracking-tight">
                        Edit User
                    </h1>
                    <h2 className="text-2xl font-semibold text-secondary">{loggedInUser.firstName} {loggedInUser.lastName}</h2>
                </div>
            </div>
            <form className="space-y-6">
                <div className="w-full">
                    <label htmlFor="firstName" className="block text-xl font-bold mb-2 text-white">
                        First name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            if (errors.length) setErrors([]);
                        }}
                        className="w-full px-4 py-3 bg-white text-background text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 shadow-md"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="lastName" className="block text-xl font-bold mb-2 text-white">
                        Last name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            if (errors.length) setErrors([]);
                        }}
                        className="w-full px-4 py-3 bg-white text-background text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 shadow-md"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="email" className="block text-xl font-bold mb-2 text-white">
                       Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.length) setErrors([]);
                        }}
                        className="w-full px-4 py-3 bg-white text-background text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 shadow-md"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="phoneNumber" className="block text-xl font-bold mb-2 text-white">
                        Phone number
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (errors.length) setErrors([]);
                        }}
                        className="w-full px-4 py-3 bg-white text-background text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 shadow-md"
                    />
                </div>

                {errors.length > 0 && (
                    <div className="bg-red-500 text-white p-4 rounded-md text-center w-full animate-pulse">
                        {errors.map((error, index) => (
                            <p key={index} className="font-semibold">
                                {error}
                            </p>
                        ))}
                    </div>
                )}

                <div className="flex justify-center pt-6">
                    <button
                        type="button"
                        onClick={handleUpdateUser}
                        className="px-8 py-3 bg-secondary text-white text-lg font-semibold rounded-md transition-all duration-300 hover:bg-accent hover:shadow-lg transform hover:scale-105"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditor;
