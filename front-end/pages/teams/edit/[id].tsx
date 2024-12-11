import Nav from '@components/layout/Nav';
import TeamEditor from '@components/teams/TeamEditor';
import TeamService from '@services/TeamService';
import { Team } from '../../../types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@components/layout/Layout';

const editTeamPage: React.FC = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchTeam = async () => {
                const response = await TeamService.getTeamById(Number(id));
                const teamData = await response.json();
                setTeam(teamData);
            };
            fetchTeam();
        }
    }, [id]);

    const handleTeamUpdated = () => {
        router.push('/teams');
    };

    return (
        <Layout>
            <Head>
                <title>Edit Team - TeamTrack</title>
            </Head>
            <main>
                {team && <TeamEditor team={team} TeamUpdated={handleTeamUpdated} />}
            </main>
        </Layout>
    );
};

export default editTeamPage;
