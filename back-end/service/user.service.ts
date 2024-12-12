import { User } from "../model/user";
import { AuthenticationResponse, UserInput } from "../types";
import userDb from "../repository/user.db";
import bcrypt from 'bcrypt';
import { generateJWTToken } from "../util/jwt";
import { Player } from "../model/player";
import playerDb from "../repository/player.db";


const getAllUsers = async () => {
    return (await userDb.getAllUsers()) || [];
};

const getUserById = async (id: number) => {
    const user = await userDb.getUserById(id);

    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    return user;
};

const getUserByEmail = async (email: string) => {
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email ${email} does not exist.`);
    }
    return user;
};

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUsers = (await userDb.getAllUsers()) || [];

    if (userInput.id === undefined || userInput.id < 0) {
        throw new Error('Invalid id.');
    }
    if (existingUsers.find((user) => user.getId() === userInput.id)) {
        throw new Error(`User with id ${userInput.id} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);

    
}

const authenticate = async ({email, password}: UserInput): Promise<AuthenticationResponse> => {
    const existingUser = await userDb.getUserByEmail(email);
    if (!existingUser) {
        throw new Error('Invalid username or password.');
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.getPassword());

    if (!isPasswordCorrect) {
        throw new Error('Invalid username or password.');
    }

    return {
        token: generateJWTToken(existingUser.getEmail(), existingUser.getRole()),
        email: existingUser.getEmail(),
        fullname: `${existingUser.getFirstName()} ${existingUser.getLastName()}`,
        role: existingUser.getRole(),
    };
};


export default { getAllUsers, getUserById, createUser, authenticate, getUserByEmail };