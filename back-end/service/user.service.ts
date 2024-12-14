import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';
import userDb from '../repository/user.db';
import bcrypt from 'bcrypt';
import { generateJWTToken } from '../util/jwt';
import { Player } from '../model/player';
import playerDb from '../repository/player.db';
import { Coach } from '../model/coach';
import coachService from './coach.service';
import playerService from './player.service';

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

const createUser = async (userInput: UserInput) => {
    const existingUsers = (await userDb.getAllUsers()) || [];

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    

    if (userInput.role == 'coach') {
        coachService.createCoach({ user: userInput });
    } else if (userInput.role == 'player') {
        playerService.createPlayer({user: userInput});
    } else {
        const newUser = new User({
            email: userInput.email,
            password: hashedPassword,
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            phoneNumber: userInput.phoneNumber,
            role: userInput.role,
        });
        const createdUser = await userDb.createUser(newUser);
    }

};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const existingUser = await userDb.getUserByEmail(email);
    if (!existingUser) {
        throw new Error('Invalid username or password.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.getPassword());

    if (!isPasswordCorrect) {
        throw new Error('Invalid username or password.');
    }

    return {
        token: generateJWTToken(existingUser.getEmail(), existingUser.getRole(), existingUser.getId()!),
        email: existingUser.getEmail(),
        fullname: `${existingUser.getFirstName()} ${existingUser.getLastName()}`,
        role: existingUser.getRole(),
        id: existingUser.getId()!
    };
};

export default { getAllUsers, getUserById, createUser, authenticate, getUserByEmail };