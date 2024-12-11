import { Game } from '../model/game';
import gameDb from '../repository/game.db';
import { GameInput } from '../types';
import { Player } from '../model/player';
import { Coach } from '../model/coach';
import { Team } from '../model/team';

const getAllGames = async (): Promise<Game[]> => {
    return await gameDb.getAllGames();
};

const getGameById = async (id: number): Promise<Game> => {
    const game = await gameDb.getGameById(id);
    if (!game) {
        throw new Error(`Game with id ${id} does not exist.`);
    }
    return game;
};

const createGame = async (gameInput: GameInput): Promise<Game> => {
    const existingGames = (await gameDb.getAllGames()) || [];

    if (existingGames.find((game) => game.getId() === gameInput.id)) {
        throw new Error(`Game with id ${gameInput.id} already exists.`);
    }
    
    if (!gameInput.teams || gameInput.teams.length !== 2) {
        throw new Error('Exactly two teams are required.');
    }

    const teams = gameInput.teams.map(teamInput => {
        const players = teamInput.players.map(playerInput => new Player(playerInput));
        const coach = new Coach(teamInput.coach);
        
        return new Team({
            id: teamInput.id,
            teamName: teamInput.teamName,
            players,
            coach,
        });
    });

    const newGame = new Game({
        id: gameInput.id,
        date: gameInput.date,
        result: gameInput.result,
        teams,
    });

    return await gameDb.createGame(newGame);
};

export default { getAllGames, getGameById, createGame };
