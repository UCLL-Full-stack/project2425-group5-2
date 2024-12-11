import { Coach, Player } from "@prisma/client";

type Role = 'coach' | 'player';

type PlayerInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

type CoachInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
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

export { Role, PlayerInput, CoachInput, TeamInput, GameInput };
