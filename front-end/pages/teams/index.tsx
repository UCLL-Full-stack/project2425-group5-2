import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@components/layout/Layout';
import TeamOverviewTable from '@components/teams/TeamOverviewTable';
import TeamService from '@services/TeamService';
import { Team } from '../../types';
import { Plus } from 'lucide-react';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Array<Team>>([]);
  const router = useRouter();

  const getTeams = async () => {
    const response = await TeamService.getAllTeams();
    const teams = await response.json();
    setTeams(teams);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const createTeamRoute = () => {
    router.push('/teams/create');
  };

  return (
    <Layout>
      <Head>
        <title>Teams - TeamTrack</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-lg shadow-xl max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Team Overview
            </h1>
            <button
              onClick={createTeamRoute}
              className="px-6 py-3 bg-secondary text-white text-lg font-semibold rounded-md transition-all duration-300 hover:bg-accent hover:shadow-lg transform hover:scale-105 flex items-center"
            >
              <Plus size={24} className="mr-2" />
              Create Team
            </button>
          </div>
          {teams.length > 0 ? (
            <TeamOverviewTable teams={teams} />
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl font-semibold text-white mb-4">No teams found</p>
              <p className="text-lg text-white">Click the 'Create Team' button to get started!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Teams;

