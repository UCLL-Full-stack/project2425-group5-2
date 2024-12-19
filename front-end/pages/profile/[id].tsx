'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Layout from '@components/layout/Layout';
import ProfileOverview from '@components/profile/profileOverview';
import { User, Team } from '../../types';
import TeamService from '@services/TeamService';
import { Edit } from 'lucide-react';
import useSWR from 'swr';
import { t } from 'i18next';

const ProfilePage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const router = useRouter();

    const fetcher = async () => {
        let teamsResponse;
        if (loggedInUser?.role === 'admin') {
            teamsResponse = await TeamService.getAllTeams();
        } else {
            teamsResponse = await TeamService.getTeamsByUserId(loggedInUser.id);
        }

        if (teamsResponse.ok) {
            const teams = await teamsResponse.json();
            return teams;
        } else {
            throw new Error(t('general.fetchError'));
        }
    };

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            setLoggedInUser(parsedUser);
        }
    }, []);

    const { data, isLoading, error } = useSWR(loggedInUser ? 'Teams' : null, fetcher);

    const editProfileRoute = () => {
        router.push(`/profile/edit/${loggedInUser?.id}`);
    };

    if (!loggedInUser) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-2xl font-semibold text-gray-600">t('general.loading')</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>t('profileIndex.title')</title>
            </Head>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-lg shadow-xl max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            t('profileIndex.overview')
                        </h1>
                        <button
                            onClick={editProfileRoute}
                            className="px-6 py-3 bg-secondary text-white text-lg font-semibold rounded-md transition-all duration-300 hover:bg-accent hover:shadow-lg transform hover:scale-105 flex items-center"
                        >
                            <Edit size={24} className="mr-2" />
                            t('profileIndex.edit')
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {data && <ProfileOverview user={loggedInUser} teams={data} />}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getServersideProps = async (context) => {
    const { locale } = context;

    return  {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common'])),
        },
    };
};

export default ProfilePage;
