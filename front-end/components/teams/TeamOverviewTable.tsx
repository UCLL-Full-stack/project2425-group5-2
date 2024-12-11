import React, { useState } from 'react';
import { Team } from '../../types';
import TeamPlayers from './TeamPlayers';
import { useRouter } from 'next/router';
import { ChevronDown, ChevronUp, Edit } from 'lucide-react';

type Props = {
    teams: Array<Team>;
};

const TeamOverviewTable: React.FC<Props> = ({ teams }) => {
    const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);
    const router = useRouter();

    const toggleTeamDropdown = (teamId: number) => {
        setExpandedTeamId((prev) => (prev === teamId ? null : teamId));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th className="px-6 py-4 text-left">Team Name</th>
                        <th className="px-6 py-4 text-left">Coach</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
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
                                    {team.coach.firstName} {team.coach.lastName}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => router.push(`teams/edit/${team.id}`)}
                                        className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-accent transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Edit size={18} className="mr-2" />
                                        Edit
                                    </button>
                                </td>
                            </tr>
                            {expandedTeamId === team.id && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 bg-gray-50">
                                        <TeamPlayers players={team.players} />
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

export default TeamOverviewTable;
