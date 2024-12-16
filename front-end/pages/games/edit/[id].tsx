import Nav from '@components/layout/Nav';
import TeamEditor from '@components/teams/TeamEditor';
import TeamService from '@services/TeamService';
import { Game, Team } from '../../../types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@components/layout/Layout';
import GameService from '@services/GameService';
import GameEditor from '@components/games/GameEditor';

const editGamePage: React.FC = () => {
    const [game, setGame] = useState<Game>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                const response = await GameService.getGameById(Number(id));
                const gameData = await response.json();
                setGame(gameData);
            };
            fetchGame();
        }
    }, [id]);

    const handleGameUpdated = () => {
        router.push('/games');
    };

    return (
        <Layout>
            <Head>
                <title>Edit Game - TeamTrack</title>
            </Head>
            <main>{game && <GameEditor game={game} gameUpdated={handleGameUpdated} />}</main>
        </Layout>
    );
};

export default editGamePage;
