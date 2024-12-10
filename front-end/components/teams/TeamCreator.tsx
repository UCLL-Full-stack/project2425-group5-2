import React, { useState, useEffect } from 'react';
import TeamService from '@/services/TeamService';
import { Team, Coach, Player } from '@/types';
import CoachService from '@/services/CoachService';
import PlayerService from '@/services/PlayerService';
import router from 'next/router';

type Props = {
    onTeamCreated: () => void;
};

const TeamCreator: React.FC<Props> = ({ onTeamCreated }) => {
    const [teamName, setTeamName] = useState<string>('');
    const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
    const [selectedPlayers, setSelectedPlayers] = useState<Array<Player>>([]);
    const [coaches, setCoaches] = useState<Array<Coach>>([]);
    const [players, setPlayers] = useState<Array<Player>>([]);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [coachesData, playersData] = await Promise.all([
                CoachService.getAllCoaches(),
                PlayerService.getAllPlayers(),
            ]);
            setCoaches(await coachesData.json());
            setPlayers(await playersData.json());
        };
        fetchData();
    }, []);

    const handleCreateTeam = async () => {
        const validationErrors: string[] = [];

        if (!teamName) {
            validationErrors.push('Team Name is required');
        }

        if (!selectedCoach) {
            validationErrors.push('Coach is required');
        }

        if (selectedPlayers.length < 1) {
            validationErrors.push('At least one player is required');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newTeam: Team = {
            teamName,
            coach: selectedCoach as Coach,
            players: selectedPlayers,
        };

        await TeamService.createTeam(newTeam);
        onTeamCreated();
    };

    const togglePlayerSelection = (player: Player) => {
        setSelectedPlayers((prevSelected) =>
            prevSelected.find((p) => p.id === player.id)
                ? prevSelected.filter((p) => p.id !== player.id)
                : [...prevSelected, player],
        );
    };

    const selectCoach = (coach: Coach) => {
        setSelectedCoach(coach);
    };

    return (
        <div>
            <h2>Create a New Team</h2>
            <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => {
                    setTeamName(e.target.value);
                    if (errors.length) setErrors([]);
                }}
            />
            {errors.length > 0 && (
                <div style={{ color: 'red' }}>
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <h3>Select Coach</h3>
            {coaches.map((coach) => (
                <div key={coach.id}>
                    <input
                        type="radio"
                        name="coach"
                        checked={selectedCoach?.id === coach.id}
                        onChange={() => {
                            selectCoach(coach);
                            if (errors.length) setErrors([]);
                        }}
                    />
                    {coach.firstName} {coach.lastName}
                </div>
            ))}
            <h3>Select Players</h3>
            {players.map((player) => (
                <div key={player.id}>
                    <input
                        type="checkbox"
                        checked={!!selectedPlayers.find((p) => p.id === player.id)}
                        onChange={() => {
                            togglePlayerSelection(player);
                            if (errors.length) setErrors([]);
                        }}
                    />
                    {player.firstName} {player.lastName}
                </div>
            ))}
            <button onClick={handleCreateTeam}>Create Team</button>
        </div>
    );
};

export default TeamCreator;
