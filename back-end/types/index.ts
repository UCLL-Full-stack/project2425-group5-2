import { Coach, Player } from '@prisma/client';

type Role = 'admin' | 'player' | 'coach';

type PlayerInput = {
    id?: number;
    user: UserInput;
};

type CoachInput = {
    id?: number;
    user: UserInput;
};

type TeamInput = {
    id?: number;
    teamName: string;
    players: PlayerInput[];
    coach: CoachInput;
};

type GameInput = {
    id?: number;
    date: Date;
    result?: string;
    teams: TeamInput[];
};

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: Role;
    id: number;
};

export { Role, PlayerInput, CoachInput, TeamInput, GameInput, UserInput, AuthenticationResponse };
