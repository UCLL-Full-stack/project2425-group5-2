import { Game } from 'types';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const getAllGames = () => {
    return fetch(apiURL + '/games', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getGameById = (id: number) => {
    return fetch(apiURL + `/games/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const updateGame = (game: Game) => {
    return fetch(`${apiURL}/games/edit/${game.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    });
};

const createGame = (game: Game) => {
    return fetch(apiURL + '/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    });
};

const getGamesByTeamId = (teamId: number) => {
    return fetch(apiURL + `/games/team/${teamId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getGamesByUserId = (userId: number) => {
    return fetch(apiURL + `/games/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const deleteGame = (id: number) => {
    return fetch(apiURL + `/games/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export default {
    getAllGames,
    getGameById,
    updateGame,
    createGame,
    getGamesByTeamId,
    deleteGame,
    getGamesByUserId,
};
