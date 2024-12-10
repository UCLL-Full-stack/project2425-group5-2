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
        <div className='bg-background'>
            {teams && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Team Name</th>
                            <th scope="col">Coach</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={index} role="button">
                                <td onClick={() => selectTeam(team)}>{team.teamName}</td>
                                <td onClick={() => selectTeam(team)}>
                                    {team.coach.firstName} {team.coach.lastName}
                                </td>
                                <td>
                                    <button onClick={() => router.push(`teams/edit/${team.id}`)}>
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
