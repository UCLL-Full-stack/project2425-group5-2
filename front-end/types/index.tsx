export type Player = {
    id: number;
    user: User;
};

export type Coach = {
    id: number;
    user: User;
};

export type Team = {
    id?: number;
    teamName: string;
    players: Player[];
    coach: Coach;
};

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export type Role = 'admin' | 'player' | 'coach';