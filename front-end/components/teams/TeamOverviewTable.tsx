import React from 'react';
import { Team } from '../../types';
import { useRouter } from 'next/router';

type Props = {
    teams: Array<Team>;
    selectTeam: (team: Team) => void;
};

const TeamOverviewTable: React.FC<Props> = ({ teams, selectTeam }: Props) => {
    const router = useRouter();

    return (
        <>
            <div className="border border-primary">
                {teams && (
                    <table className="table table-hover w-full">
                        <thead className="bg-accent">
                            <tr className="text-lg text-white font-semibold">
                                <th scope="col" className="px-8 py-4 text-left">
                                    Team Name
                                </th>
                                <th scope="col" className="px-8 py-4 text-left">
                                    Coach
                                </th>
                                <th scope="col" className="px-8 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-background">
                            {teams.map((team, index) => (
                                <tr
                                    key={index}
                                    role="button"
                                    className="bg-background border-b border-primary"
                                >
                                    {/* Only the team name cell is clickable */}
                                    <td
                                        onClick={() => selectTeam(team)}
                                        className="px-8 py-6 cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        {team.teamName}
                                    </td>
                                    <td className="px-8 py-6">
                                        {team.coach.firstName} {team.coach.lastName}
                                    </td>
                                    <td className="px-8 py-6">
                                        <button
                                            onClick={() => router.push(`teams/edit/${team.id}`)}
                                            className="bg-primary hover:bg-accent hover:text-white transition-colors hover:shadow-heavy duration-200 py-3 px-6 rounded-md"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default TeamOverviewTable;
