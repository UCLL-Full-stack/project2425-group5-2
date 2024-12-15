import Layout from '@components/layout/Layout';
import ProfileEditor from '@components/profile/ProfileEditor';
import { Edit } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from 'types';

const ProfilePage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const router = useRouter();

    useEffect (() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            setLoggedInUser(parsedUser);
        }
    }, []);

    if (!loggedInUser) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        router.push('/');
    };

    return (
      <Layout>
      <Head>
        <title>Profile - TeamTrack</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-lg shadow-xl max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Profile Overview
            </h1>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ProfileEditor loggedInUser={loggedInUser} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </Layout>
    )
};

export default ProfilePage;