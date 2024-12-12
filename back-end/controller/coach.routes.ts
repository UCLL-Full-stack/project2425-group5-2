/**
 * @swagger
 *   components:
 *     schemas:
 *       Coach:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           firstName:
 *             type: string
 *             description: The first name of the coach.
 *           lastName:
 *             type: string
 *             description: The last name of the coach.
 *           email:
 *             type: string
 *             description: The email of the coach.
 *           phoneNumber:
 *             type: string
 *             description: The phone number of the coach.
 */

import express, { Request, Response, NextFunction } from 'express';
import coachService from '../service/coach.service';

const coachRouter = express.Router();

/**
 * @swagger
 * /coaches:
 *   get:
 *     summary: Get a list of all coaches.
 *     responses:
 *       200:
 *         description: A JSON array of all coaches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coach'
 */

coachRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Coaches = await coachService.getAllCoaches();
        res.status(200).json(Coaches);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /coaches/{id}:
 *   get:
 *      summary: Get a coach by ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the coach to return.
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: A JSON object of the coach.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Coach'
 */
coachRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coach = await coachService.getCoachById(parseInt(req.params.id));
        res.status(200).json(coach);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { coachRouter };
