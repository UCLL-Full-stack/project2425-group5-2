import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { playerRouter } from './controller/player.routes';
import { teamRouter } from './controller/team.routes';
import { gameRouter } from './controller/game.routes';
import { coachRouter } from './controller/coach.routes';
import { userRouter } from './controller/user.routes';
import helmet from 'helmet';

const app = express();
app.use(helmet());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/teams', teamRouter);
app.use('/players', playerRouter);
app.use('/games', gameRouter);
app.use('/coaches', coachRouter);
app.use('/users', userRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TeamTrack API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
