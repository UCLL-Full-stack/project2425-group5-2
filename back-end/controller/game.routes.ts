/**
 * @swagger
 *   components:
 *     schemas:
 *       Game:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           date:
 *             type: Date
 *             description: The date of the game.
 *           result:
 *             type: string
 *             description: The result of the game.
 *           teams:
 *             type: array
 *             description: The teams playing the game.
 *             items:
 *             $href: '#/components/schemas/Team'
 *       gameInput:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: The ID for the game.
 *           date:
 *             type: Date
 *             description: The date of the game.
 *           result:
 *             type: string
 *             description: The result of the game.
 *           teams:
 *             type: array
 *             description: The teams playing the game.
 *             items:
 *             $href: '#/components/schemas/Team'
 */

import express, { NextFunction, Request, Response } from 'express';
import gameService from '../service/game.service';
import { GameInput } from '../types';
import { Game } from '../model/game';

const gameRouter = express.Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games.
 *     responses:
 *       200:
 *         description: A JSON array of all games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = gameService.getAllGames();
        res.status(200).json(games);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /games/{id}:
 *   get:
 *      summary: Get a game by ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the game to return.
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: A JSON object of the game.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Game'
 */
gameRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = gameService.getGameById(Number(req.params.id));
        res.status(200).json(game);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /games/team/{id}:
 *   get:
 *      summary: Get a list of games by team ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the team to return games for.
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: A JSON array of games for the team.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Game'
 */
gameRouter.get('/team/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = await gameService.getGamesByTeamId(parseInt(req.params.id));
        res.status(200).json(game);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

gameRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = await gameService.getGamesByUserId(parseInt(req.params.id));
        res.status(200).json(game);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/gameInput'
 *     responses:
 *       200:
 *         description: The created game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
gameRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = gameService.createGame(req.body);
        res.status(200).json(game);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /games/edit/{id}:
 *   put:
 *     summary: Update a game by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the game to update.
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/gameInput'
 *     responses:
 *       200:
 *         description: The updated game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
gameRouter.put('/edit/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameData: GameInput = req.body;

        const id = req.params.id;

        const updatedGame: Game = await gameService.updateGame(parseInt(id), gameData);
        res.status(200).json(updatedGame);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the game to delete.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The deleted game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
gameRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = await gameService.deleteGame(parseInt(req.params.id));
        res.status(200).json(game);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { gameRouter };
