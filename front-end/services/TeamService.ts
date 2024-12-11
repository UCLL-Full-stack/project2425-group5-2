import { Team } from '../types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllTeams = async () => {
    return await fetch(apiUrl + '/teams', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getTeamById = async (id: number) => {
    return await fetch(apiUrl + `/teams/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const updateTeam = async (team: Team) => {
    return await fetch(apiUrl + `/teams/edit/${team.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    });
};

const createTeam = async (team: Team) => {
    return await fetch(apiUrl + '/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    });
};

const TeamService = {
    getAllTeams,
    createTeam,
    getTeamById,
    updateTeam,
};

export default TeamService;
