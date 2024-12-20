import coachService from '../../service/coach.service';
import coachDb from '../../repository/coach.db';
import { Coach } from '../../model/coach';

const validId = 1;
const invalidId = -1;
const validFirstName = 'Jason';
const invalidFirstName = '';
const validLastName = 'Bourne';
const invalidLastName = '';
const validEmail = 'jasonbourne@ucll.be';
const invalidEmail = '';
const validPhoneNumber = '0423456789';
const invalidPhoneNumber = '';
const 

let mockGetAllCoaches: jest.Mock;
let mockGetCoachById: jest.Mock;
let mockCreateCoach: jest.Mock;

beforeEach(() => {
    mockGetAllCoaches = jest.fn();
    mockGetCoachById = jest.fn();
    mockCreateCoach = jest.fn();

    coachDb.getAllCoaches = mockGetAllCoaches;
    coachDb.getCoachById = mockGetCoachById;
    coachDb.createCoach = mockCreateCoach;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenValidId_whenGettingCoachById_thenCoachIsReturned', async () => {
    // given
    const validCoach = new Coach({
        id: validId,
        user: 
    });

    mockGetCoachById.mockResolvedValue(validCoach);

    // when
    const coach = await coachService.getCoachById(validId);

    // then
    expect(coach).toEqual(validCoach);
    expect(coach).not.toBeUndefined();
});

test('givenInvalidId_whenGettingCoachById_thenErrorIsThrown', async () => {
    // given
    mockGetCoachById.mockResolvedValue(undefined);

    // when & then
    await expect(coachService.getCoachById(invalidId)).rejects.toThrow(
        `Coach with id ${invalidId} does not exist.`
    );
});

test('givenAllCoaches_whenGettingAllCoaches_thenAllCoachesAreReturnedSuccessfully', async () => {
    // given
    const allCoaches = [
        new Coach({
            id: validId,
            firstName: validFirstName,
            lastName: validLastName,
            email: validEmail,
            phoneNumber: validPhoneNumber,
        }),
    ];

    mockGetAllCoaches.mockResolvedValue(allCoaches);

    // when
    const coaches = await coachService.getAllCoaches();

    // then
    expect(coaches).toEqual(allCoaches);
});

test('givenValidInput_whenCreatingCoach_thenCoachIsCreatedSuccessfully', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };
    const coach = new Coach(coachInput);

    mockGetAllCoaches.mockResolvedValue([]);
    mockCreateCoach.mockResolvedValue(coach);

    // when
    const createdCoach = await coachService.createCoach(coachInput);

    // then
    expect(createdCoach).toEqual(coach);
    expect(createdCoach).not.toBeUndefined();
});

test('givenInvalidId_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: invalidId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Invalid id.');
});

test('givenExistingCoachId_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    const existingCoach = new Coach(coachInput);
    mockGetAllCoaches.mockResolvedValue([existingCoach]);

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow(
        `Coach with id ${validId} already exists.`
    );
});

test('givenInvalidFirstName_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: invalidFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('First name is required.');
});

test('givenInvalidLastName_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: invalidLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Last name is required.');
});

test('givenInvalidEmail_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: invalidEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Email is required.');
});

test('givenInvalidPhoneNumber_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: invalidPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Phone number is required.');
});

test('givenValidId_whenGettingCoachById_thenCoachIsReturned', async () => {
    // given
    const validCoach = new Coach({
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    });

    mockGetCoachById.mockResolvedValue(validCoach);

    // when
    const coach = await coachService.getCoachById(validId);

    // then
    expect(coach).toEqual(validCoach);
    expect(coach).not.toBeUndefined();
});

test('givenInvalidId_whenGettingCoachById_thenErrorIsThrown', async () => {
    // given
    mockGetCoachById.mockResolvedValue(undefined);

    // when & then
    await expect(coachService.getCoachById(invalidId)).rejects.toThrow(
        `Coach with id ${invalidId} does not exist.`
    );
});

test('givenAllCoaches_whenGettingAllCoaches_thenAllCoachesAreReturnedSuccessfully', async () => {
    // given
    const allCoaches = [
        new Coach({
            id: validId,
            firstName: validFirstName,
            lastName: validLastName,
            email: validEmail,
            phoneNumber: validPhoneNumber,
        }),
    ];

    mockGetAllCoaches.mockResolvedValue(allCoaches);

    // when
    const coaches = await coachService.getAllCoaches();

    // then
    expect(coaches).toEqual(allCoaches);
});

test('givenValidInput_whenCreatingCoach_thenCoachIsCreatedSuccessfully', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };
    const coach = new Coach(coachInput);

    mockCreateCoach.mockResolvedValue(coach);

    // when
    const createdCoach = await coachService.createCoach(coachInput);

    // then
    expect(createdCoach).toEqual(coach);
});

test('givenInvalidId_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: invalidId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Invalid id.');
});

test('givenExistingCoachId_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    const existingCoach = new Coach(coachInput);
    mockGetAllCoaches.mockResolvedValue([existingCoach]);

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow(
        `Coach with id ${validId} already exists.`
    );
});

test('givenInvalidFirstName_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: invalidFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('First name is required.');
});

test('givenInvalidLastName_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: invalidLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Last name is required.');
});

test('givenInvalidEmail_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: invalidEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Email is required.');
});

test('givenInvalidPhoneNumber_whenCreatingCoach_thenErrorIsThrown', async () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: invalidPhoneNumber,
    };

    // when & then
    await expect(coachService.createCoach(coachInput)).rejects.toThrow('Phone number is required.');
});
