import { Player } from '../model/player';
import { User } from '../model/user';
import playerDb from '../repository/player.db';
import { PlayerInput } from '../types';

const getAllPlayers = async (): Promise<Player[]> => {
    return (await playerDb.getAllPlayers()) || [];
};

const getPlayerById = async (id: number): Promise<Player> => {
    const player = await playerDb.getPlayerById(id);

    if (!player) {
        throw new Error(`Player with id ${id} does not exist.`);
    }
    return player;
};

const createPlayer = async (playerInput: PlayerInput): Promise<Player> => {
    const existingPlayers = (await playerDb.getAllPlayers()) || [];

    if (existingPlayers.find((player) => player.getId() === playerInput.id)) {
        throw new Error(`Player with id ${playerInput.id} already exists.`);
    }

    const newPlayer = new Player({id: playerInput.id, user: new User(playerInput.user)});
    return await playerDb.createPlayer(newPlayer);
};

export default { getAllPlayers, getPlayerById, createPlayer };
