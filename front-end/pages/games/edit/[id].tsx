import { Game, Team } from '../../../types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@components/layout/Layout';
import GameService from '@services/GameService';
import GameEditor from '@components/games/GameEditor';

const editGamePage: React.FC = () => {
    const [game, setGame] = useState<Game | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                try {
                    const response = await GameService.getGameById(Number(id));
                    if (response.ok) {
                        const gameData = await response.json();
                        setGame(gameData);
                    } else {
                        console.error('Failed to fetch game:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching game:', error);
                }
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
