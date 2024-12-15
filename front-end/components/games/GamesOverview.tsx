import React, { useEffect, useState } from 'react';
import { Team, User } from '../../types';
import { useRouter } from 'next/router';
import { ChevronDown, ChevronUp } from 'lucide-react';
import GameDetails from './GameDetails';

type GamesOverviewProps = {
    teams: Team[];
    games: Game[];
};

const GamesOverview: React.FC<GamesOverviewProps> = ({ teams, games }) => {
    const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User>(null);
    const [teamsWithGamesPlayed, setTeamsWithGamesPlayed] = useState<Team[]>([]);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            setLoggedInUser(parsedUser);
        }
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            const updatedTeams = teams.map((team) => {
                const gamesPlayed = team.games.filter((game) => game.isFinal).length;
                return { ...team, gamesPlayed };
            });
        }
    }, [teams, games]);

    if (!loggedInUser) {
        return <p>Loading...</p>;
    }
    const toggleTeamDropdown = (teamId: number) => {
        setExpandedTeamId((prev) => (prev === teamId ? null : teamId));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th className="px-6 py-4 text-left">Team Name</th>
                        <th className="px-6 py-4 text-left">Games Played</th>
                    </tr>
                </thead>
                <tbody>
                    {teamsWithGamesPlayed.map((team) => (
                        <React.Fragment key={team.id}>
                            <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => toggleTeamDropdown(team.id)}
                                        className="flex items-center space-x-2 text-lg font-medium text-gray-900 hover:text-accent transition-colors duration-200"
                                    >
                                        <span>{team.teamName}</span>
                                        {expandedTeamId === team.id ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-gray-900">
                                    {team.gamesPlayed}
                                </td>
                            </tr>
                            {expandedTeamId === team.id && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 bg-gray-50">
                                        <GameDetails games={team.games} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GamesOverview;
