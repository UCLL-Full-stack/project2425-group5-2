import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import bcrypt from 'bcrypt';
import * as jwtUtil from '../../util/jwt';
import coachService from '../../service/coach.service';
import playerService from '../../service/player.service';
import { Role } from '../../types';

const validId = 1;
const invalidId = -1;
const validFirstName = 'Test';
const invalidFirstName = '';
const validLastName = 'Tester';
const invalidLastName = '';
const validEmail = 'testtester@ucll.be';
const invalidEmail = '';
const validPhoneNumber = '0423456789';
const invalidPhoneNumber = '';
const validRole = 'coach' as Role;
const invalidRole = 'invalid' as Role;
const validPassword = 'password';
const invalidPassword = '';

const validUser = {
    id: validId,
    firstName: validFirstName,
    lastName: validLastName,
    email: validEmail,
    phoneNumber: validPhoneNumber,
    role: validRole,
    password: validPassword
};

let mockGetAllUsers: jest.Mock;
let mockGetUserById: jest.Mock;
let mockCreateUser: jest.Mock;
let mockGetUserByEmail: jest.Mock;
let mockUpdateUser: jest.Mock;
let mockHash: jest.Mock;
let mockCompare: jest.Mock;
let mockGenerateJWTToken: jest.Mock;

beforeEach(() => {
    mockGetAllUsers = jest.fn();
    mockGetUserById = jest.fn();
    mockCreateUser = jest.fn();
    mockGetUserByEmail = jest.fn();
    mockUpdateUser = jest.fn();
    mockHash = jest.fn();
    mockCompare = jest.fn();
    mockGenerateJWTToken = jest.fn();

    userService.getAllUsers = mockGetAllUsers;
    userService.getUserById = mockGetUserById;
    userService.createUser = mockCreateUser;
    userService.getUserByEmail = mockGetUserByEmail;
    userService.updateUser = mockUpdateUser;
    bcrypt.hash = mockHash;
    bcrypt.compare = mockCompare;
    jest.spyOn(jwtUtil, 'generateJWTToken').mockImplementation(mockGenerateJWTToken);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('Given all users, when getAllUsers is called, then all users are returned', async () => {
    // Given
    mockGetAllUsers.mockResolvedValue([validUser]);

    // When
    const users = await userService.getAllUsers();

    // Then
    expect(users).toEqual([validUser]);
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
});

test('Given no users, when getAllUsers is called, then an empty array is returned', async () => {
    // Given
    mockGetAllUsers.mockResolvedValue([]);

    // When
    const users = await userService.getAllUsers();

    // Then
    expect(users).toEqual([]);
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
});

test('Given a valid user ID, when getUserById is called, then the user is returned', async () => {
    // Given
    mockGetUserById.mockResolvedValue(validUser);

    // When
    const user = await userService.getUserById(validId);

    // Then
    expect(user).toEqual(validUser);
    expect(mockGetUserById).toHaveBeenCalledWith(validId);
});

test('Given an invalid user ID, when getUserById is called, then an error is thrown', async () => {
    // Given
    mockGetUserById.mockResolvedValue(null);

    // When & Then
    await expect(userService.getUserById(invalidId)).rejects.toThrow(`User with id ${invalidId} does not exist.`);
    expect(mockGetUserById).toHaveBeenCalledWith(invalidId);
});

test('Given a valid email, when getUserByEmail is called, then the user is returned', async () => {
    // Given
    mockGetUserByEmail.mockResolvedValue(validUser);

    // When
    const user = await userService.getUserByEmail(validEmail);

    // Then
    expect(user).toEqual(validUser);
    expect(mockGetUserByEmail).toHaveBeenCalledWith(validEmail);
});

test('Given an invalid email, when getUserByEmail is called, then an error is thrown', async () => {
    // Given
    mockGetUserByEmail.mockResolvedValue(null);

    // When & Then
    await expect(userService.getUserByEmail(invalidEmail)).rejects.toThrow(`User with email ${invalidEmail} does not exist.`);
    expect(mockGetUserByEmail).toHaveBeenCalledWith(invalidEmail);
});

test('Given valid user input, when createUser is called, then a new user is created', async () => {
    // Given
    mockGetAllUsers.mockResolvedValue([]);
    mockHash.mockResolvedValue('hashedPassword');
    mockCreateUser.mockResolvedValue(validUser);

    const userInput = {
        email: "rajo.test@test.be",
        password: validPassword,
        firstName: validFirstName,
        lastName: validLastName,
        phoneNumber: "0499556688",
        role: validRole
    };

    // When
    const user = await userService.createUser(userInput);

    // Then
    expect(user).toMatchObject({
        email: userInput.email,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        phoneNumber: userInput.phoneNumber,
        role: userInput.role
    });
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    expect(mockHash).toHaveBeenCalledWith('password', 12);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
});

test('Given an existing email, when createUser is called, then an error is thrown', async () => {
    // Given
    mockGetAllUsers.mockResolvedValue([validUser]);

    const userInput = {
        email: validEmail,
        password: validPassword,
        firstName: validFirstName,
        lastName: validLastName,
        phoneNumber: validPhoneNumber,
        role: validRole
    };

    // When & Then
    await expect(userService.createUser(userInput)).toThrow('User with this email already exists.');
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
});

test('Given valid credentials, when authenticate is called, then the user is authenticated', async () => {
    // Given
    mockGetUserByEmail.mockResolvedValue(validUser);
    mockCompare.mockResolvedValue(true);
    mockGenerateJWTToken.mockReturnValue('token');

    const userInput = {
        email: validEmail,
        password: validPassword,
        firstName: validFirstName,
        lastName: validLastName,
        phoneNumber: validPhoneNumber,
        role: validRole,
    };

    // When
    const response = await userService.authenticate(userInput);

    // Then
    expect(response).toEqual({
        token: 'token',
        email: validEmail,
        role: validRole,
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        phoneNumber: validPhoneNumber,
        password: validPassword
    });
    expect(mockGetUserByEmail).toHaveBeenCalledWith(validEmail);
    expect(mockCompare).toHaveBeenCalledWith('password', validUser.password);
    expect(mockGenerateJWTToken).toHaveBeenCalledTimes(1);
});

test('Given an invalid email, when authenticate is called, then an error is thrown', async () => {
    // Given
    mockGetUserByEmail.mockResolvedValue(null);

    const userInput = {
        email: invalidEmail,
        password: validPassword,
        firstName: validFirstName,
        lastName: validLastName,
        phoneNumber: validPhoneNumber,
        role: validRole
    };

    // When & Then
    await expect(userService.authenticate(userInput)).rejects.toThrow('Invalid username or password.');
    expect(mockGetUserByEmail).toHaveBeenCalledWith(invalidEmail);
});

test('Given an incorrect password, when authenticate is called, then an error is thrown', async () => {
    // Given
    mockGetUserByEmail.mockResolvedValue(validUser);
    mockCompare.mockResolvedValue(false);

    const userInput = {
        email: validEmail,
        password: invalidPassword,
        firstName: validFirstName,
        lastName: validLastName,
        phoneNumber: validPhoneNumber,
        role: validRole
    };

    // When & Then
    await expect(userService.authenticate(userInput)).rejects.toThrow('Invalid username or password.');
    expect(mockGetUserByEmail).toHaveBeenCalledWith(validEmail);
    expect(mockCompare).toHaveBeenCalledWith('wrongPassword', validUser.password);
});

test('Given a valid user ID and input, when updateUser is called, then the user is updated', async () => {
    // Given
    mockGetUserById.mockResolvedValue(validUser);
    mockUpdateUser.mockResolvedValue(validUser);

    const userInput = {
        email: validEmail,
        firstName: validFirstName,
        lastName: validLastName,
        password: 'password',
        phoneNumber: validPhoneNumber,
        role: validRole
    };

    // When
    const user = await userService.updateUser(validId, userInput);

    // Then
    expect(user).toEqual(validUser);
    expect(mockGetUserById).toHaveBeenCalledWith(validId);
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
});

test('Given an invalid user ID, when updateUser is called, then an error is thrown', async () => {
    // Given
    mockGetUserById.mockResolvedValue(null);

    const userInput = {
        email: validEmail,
        firstName: validFirstName,
        lastName: validLastName,
        password: 'password',
        phoneNumber: validPhoneNumber,
        role: validRole
    };

    // When & Then
    await expect(userService.updateUser(invalidId, userInput)).rejects.toThrow('No user with that id exists.');
    expect(mockGetUserById).toHaveBeenCalledWith(invalidId);
});

test('Given an undefined ID, when updateUser is called, then an error is thrown', async () => {
    // Given
    const userInput = {
        id: invalidId,
        email: validEmail,
        firstName: validFirstName,
        lastName: validLastName,
        password: validPassword,
        phoneNumber: validPhoneNumber,
        role: validRole
    };

    // When & Then
    await expect(userService.updateUser(invalidId, userInput)).toThrow('An id is required.');
});