export type Player = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

export type Coach = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

export type Team = {
    id?: number;
    teamName: string;
    players: Player[];
    coach: Coach;
};
