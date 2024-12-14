import { Team } from '../types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllTeams = () => {
    return fetch(apiUrl + '/teams', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getTeamById = (id: number) => {
    return fetch(apiUrl + `/teams/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const updateTeam = (team: Team) => {
    return fetch(apiUrl + `/teams/edit/${team.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    });
};

const createTeam = (team: Team) => {
    return fetch(apiUrl + '/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    });
};

const getTeamsByUserId = (userId: number) => {
    return fetch(apiUrl + `/teams/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const deleteTeam = (id: number) => {
    return fetch(apiUrl + `/teams/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const TeamService = {
    getAllTeams,
    createTeam,
    getTeamById,
    updateTeam,
    getTeamsByUserId,
    deleteTeam,
};

export default TeamService;
