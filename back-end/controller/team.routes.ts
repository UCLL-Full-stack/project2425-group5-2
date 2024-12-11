import express, { NextFunction, Request, Response } from 'express';
import teamService from '../service/team.service';
import { Team } from '../model/team';
import { TeamInput } from '../types/index';

/**
 * @swagger
 *   components:
 *     schemas:
 *       Team:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: The ID for the team.
 *           teamName:
 *             type: string
 *             description: The name of the team.
 *           players:
 *             type: array
 *             description: An array of players in the team.
 *             items:
 *               $ref: '#/components/schemas/Player'
 *           coach:
 *             $ref: '#/components/schemas/Coach'
 *       TeamInput:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: The ID for the team.
 *           teamName:
 *             type: string
 *             description: The name of the team.
 *           players:
 *             type: array
 *             description: An array of players in the team.
 *             items:
 *               $ref: '#/components/schemas/Player'
 *           coach:
 *             $ref: '#/components/schemas/Coach'
 */

const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get a list of all teams.
 *     responses:
 *       200:
 *         description: A JSON array of all teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *      summary: Get a team by ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the team to return.
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: A JSON object of the team.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Team'
 */
teamRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await teamService.getTeamById(parseInt(req.params.id));
        res.status(200).json(team);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /teams/coach/{id}:
 *   get:
 *      summary: Get a list of all teams coached by a coach.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the coach.
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: A JSON array of all teams coached by the coach.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Team'
 */
teamRouter.get('/coach/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamService.getTeamsByCoach(parseInt(req.params.id));
        res.status(200).json(teams);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamInput'
 *     responses:
 *       200:
 *         description: A new team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */
teamRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamData: TeamInput = req.body;
        const createdTeam: Team = await teamService.createTeam(teamData);
        res.status(200).json(createdTeam);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

teamRouter.put('/edit/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamData: TeamInput = req.body;

        const id = req.params.id;

        const updatedTeam: Team = await teamService.updateTeam(parseInt(id), teamData);
        res.status(200).json(updatedTeam);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { teamRouter };
