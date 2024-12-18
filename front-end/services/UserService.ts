import { Team, User } from '../types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const token = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("loggedInUser"))?.token : null;
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

const updateUser = (user: User) => {
    return fetch(apiUrl + `/users/edit/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });
}

const UserService = { logInUser, registerUser, updateUser};

export default UserService;
