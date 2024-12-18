import Head from 'next/head';
import GameCreator from '@components/games/GameCreator';
import { useRouter } from 'next/router';
import Layout from '@components/layout/Layout';
import { useEffect, useState } from 'react';
import { User } from 'types';
import TeamService from '@services/TeamService';
import useSWR from 'swr';

const GameCreatePage: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    const fetcher = async () => {
            const teamsResponse = await TeamService.getAllTeams();
            if (teamsResponse.ok) {
                const teams = await teamsResponse.json();
                return teams;
            } else {
                throw new Error('Failed to fetch data');
            }
        };

    useEffect(() => {
            const user = sessionStorage.getItem('loggedInUser');
            if (user) {
                const parsedUser = JSON.parse(user);
                setLoggedInUser(parsedUser);
            }
        }, []);

    const { data, isLoading, error } = useSWR(loggedInUser ? "Teams" : null, fetcher);

    const handleGameCreated = async () => {
        router.push('/games');
    };

    return (
        <Layout>
            <Head>
                <title>Create Team - TeamTrack</title>
            </Head>
            <main className="d-flex flex-column justify-content-center align-items-center">
                {data && <GameCreator onGameCreated={handleGameCreated} teams={data} />}
            </main>
        </Layout>
    );
};

export default GameCreatePage;
