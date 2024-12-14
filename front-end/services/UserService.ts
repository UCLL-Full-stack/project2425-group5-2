import { Team, User } from '../types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const logInUser = (user: User) => {
    return fetch(apiUrl + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: User) => {
    return fetch(apiUrl + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const UserService = { logInUser, registerUser };

export default UserService;
