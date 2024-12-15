import React, { useEffect, useState } from 'react';
import { Game, Player } from '../../types';
import { useRouter } from 'next/router';
import { Edit, Trash } from 'lucide-react';
import GameService from '@services/GameService';

type Props = {
    games: Array<Game>;
    getGames: () => void;
};

const GameDetailsTable: React.FC<Props> = ({ games, getGames }) => {
    const [loggedInUser, setLoggedInUser] = useState<Player | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            setLoggedInUser(parsedUser);
        }
    }, []);

    if (!loggedInUser) {
        return <p className="text-center py-4">Loading...</p>;
    }

    const deleteGame = async (gameId: number) => {
        try {
            await GameService.deleteGame(gameId);
            getGames();
        } catch (error) {
            console.error('Error deleting game:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 px-6 pt-4">Games Played</h3>
            {games && games.length > 0 ? (
                <table className="w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Teams</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Result</th>
                            {(loggedInUser.role === 'coach' || loggedInUser.role === 'admin') && (
                                <>
                                    <th className="px-6 py-3 text-center text-sm font-semibold">
                                        Edit
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold">
                                        Delete
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr
                                key={game.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                } hover:bg-gray-100 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 text-sm text-gray-900">{game.date}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {game.teams.map((team, index) => (
                                        <span key={index} className="mr-2">
                                            {team.teamName}
                                            {index < game.teams.length - 1 && ' vs '}
                                        </span>
                                    ))}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{game.result}</td>
                                {(loggedInUser.role === 'coach' ||
                                    loggedInUser.role === 'admin') && (
                                    <>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() =>
                                                    router.push(`/games/${game.id}/edit`)
                                                }
                                                className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-accent transition-all duration-300 transform hover:scale-105"
                                            >
                                                <Edit size={18} className="mr-2" />
                                                Edit
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => deleteGame(game.id)}
                                                className="inline-flex items-center px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-300 transition-all duration-300 transform hover:scale-105"
                                            >
                                                <Trash size={18} className="mr-2" />
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600 text-center py-4">No games available.</p>
            )}
        </div>
    );
};

export default GameDetailsTable;
