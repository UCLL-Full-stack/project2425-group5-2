import React, { useState, useEffect } from 'react';
import TeamService from '@services/TeamService';
import { Team, Coach, Player, User, Game } from '../../types';
import { ArrowLeft, Square, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/router';
import GameService from '@services/GameService';

type Props = {
    onGameCreated: () => void;
};

const TeamCreator: React.FC<Props> = ({ onGameCreated }) => {
    const [date, setDate] = useState<string>('');
    const [teams, setTeams] = useState<Team[]>([]);
    const [assignedTeams, setAssignedTeams] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            setLoggedInUser(parsedUser);
        }
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            const fetchData = async () => {
                const teamsData = await TeamService.getAllTeams();

                const allTeams = await teamsData.json();

                setTeams(allTeams);
            };
            fetchData();
        }
    }, [loggedInUser]);

    if (!loggedInUser) {
        return <p>Loading...</p>;
    }

    const handleCreateGame = async () => {
        const validationErrors: string[] = [];

        if (selectedTeams.length != 2) {
            validationErrors.push('Two teams are required');
        }

        if (!date) {
            validationErrors.push('Date is required');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formattedDate = new Date(date).toISOString();
        console.log('Formatted Date:', formattedDate);

        const newGame: Game = {
            date: formattedDate,
            teams: selectedTeams,
            result: null,
        };

        await GameService.createGame(newGame);
        onGameCreated();
    };

    const toggleTeamSelection = (team: Team) => {
        setSelectedTeams((prevSelected) => {
            if (prevSelected.find((t) => t.id === team.id)) {
                return prevSelected.filter((t) => t.id !== team.id);
            } else if (prevSelected.length < 2) {
                return [...prevSelected, team];
            } else {
                return prevSelected;
            }
        });
    };

    const goBack = () => {
        router.push('/games');
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
                        Create a New Game
                    </h1>
                </div>
            </div>
            <form className="space-y-6">
                <div className="w-full">
                    <label htmlFor="date" className="block text-xl font-bold mb-2 text-white">
                        Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        placeholder="Enter team name"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            if (errors.length) setErrors([]);
                        }}
                        className="bg-white text-background hover:bg-accent hover:text-white w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 shadow-md"
                    />
                </div>

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
                    <h3 className="text-2xl font-bold mb-4 text-white">Select Teams</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
                        {teams.map((team) => (
                            <div key={team.id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleTeamSelection(team);
                                        if (errors.length) setErrors([]);
                                    }}
                                    disabled={
                                        selectedTeams.length === 2 &&
                                        !selectedTeams.find((t) => t.id === team.id)
                                    }
                                    className={`w-full py-2 px-3 rounded-md transition-all duration-300 flex items-center justify-between text-sm ${
                                        selectedTeams.find((t) => t.id === team.id)
                                            ? 'bg-secondary text-white shadow-md'
                                            : 'bg-white text-background hover:bg-accent hover:text-white'
                                    } ${
                                        selectedTeams.length === 2 &&
                                        !selectedTeams.find((t) => t.id === team.id) &&
                                        'opacity-50 cursor-not-allowed'
                                    }`}
                                >
                                    <span className="font-medium truncate">{team.teamName}</span>
                                    {selectedTeams.find((t) => t.id === team.id) ? (
                                        <CheckSquare
                                            className="text-white flex-shrink-0"
                                            size={16}
                                        />
                                    ) : (
                                        <Square className="text-secondary" size={16} />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center pt-6">
                    <button
                        type="button"
                        onClick={handleCreateGame}
                        className="px-8 py-3 bg-secondary text-white text-lg font-semibold rounded-md transition-all duration-300 hover:bg-accent hover:shadow-lg transform hover:scale-105"
                    >
                        Create Game
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeamCreator;
