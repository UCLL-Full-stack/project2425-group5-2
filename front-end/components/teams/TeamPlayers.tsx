import React from 'react';
import { Player } from '../../types';
import { UserCircle } from 'lucide-react';

type Props = {
    players: Array<Player>;
};

const TeamPlayers: React.FC<Props> = ({ players }) => {
    return (
        <div className="bg-primary rounded-lg shadow-md overflow-hidden">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 px-6 pt-4">Team Players</h3>
            {players && players.length > 0 ? (
                <table className="w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                First Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr
                                key={player.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                } hover:bg-gray-100 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 text-sm text-gray-900 flex items-center">
                                    <UserCircle size={20} className="mr-2 text-secondary" />
                                    {player.firstName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {player.lastName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600 text-center py-4">No players in this team.</p>
            )}
        </div>
    );
};

export default TeamPlayers;
