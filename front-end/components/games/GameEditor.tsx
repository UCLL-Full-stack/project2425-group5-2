import React, { useEffect, useState } from 'react';
import TeamService from '@services/TeamService';
import { Game, Player, Team } from '../../types';
import { ArrowLeft, Square, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/router';
import GameService from '@services/GameService';

type Props = {
    game: Game;
    gameUpdated: () => void;
};

const GameEditor: React.FC<Props> = ({ game, gameUpdated }) => {
    const [date, setDate] = useState<string>('');
    const [score, setScore] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    const router = useRouter();

    const handleUpdateGame = async () => {
        const validationErrors: string[] = [];

        if (!date) {
            validationErrors.push('Date is required');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!game.id) return;

        const updatedGame: Game = {
            id: game.id,
            date,
        };

        await GameService.updateGame(updatedGame);
        gameUpdated();
    };

    const goBack = () => {
        router.push('/teams');
    };

    };

    return (
        <div className="bg-gradient-to-br from-primary to-accent text-text p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
                <button
                    onClick={goBack}
                    className="p-2 bg-secondary hover:bg-red-500 text-white rounded-full transition-all duration-300 transform hover:scale-110"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-grow text-center">
                    <h1 className="text-4xl font-extrabold mb-2 text-white tracking-tight">
                        Edit Game
                    </h1>
                </div>
            </div>
            <form className="space-y-6">
                {errors.length > 0 && (
                    <div className="bg-red-500 text-white p-4 rounded-md text-center w-full animate-pulse">
                        {errors.map((error, index) => (
                            <p key={index} className="font-semibold">
                                {error}
                            </p>
                        ))}
                    </div>
                )}

                <div className="w-full">
                    <h3 className="text-2xl font-bold mb-4 text-white">Select Players</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
                        
                                <button
                                    type="button"
                                    onClick={() => {
                                        togglePlayerSelection(player);
                                        if (errors.length) setErrors([]);
                                    }}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center pt-6">
                    <button
                        type="button"
                        onClick={handleUpdateTeam}
                        className="px-8 py-3 bg-secondary text-white text-lg font-semibold rounded-md transition-all duration-300 hover:bg-accent hover:shadow-lg transform hover:scale-105"
                    >
                        Update Team
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeamEditor;
