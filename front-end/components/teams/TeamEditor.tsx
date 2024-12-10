import PlayerService from '@/services/PlayerService';
import TeamService from '@/services/TeamService';
import { Player, Team } from '@/types';
import { useEffect, useState } from 'react';

type Props = {
    team: Team;
    TeamUpdated: () => void;
};

const TeamEditor: React.FC<Props> = ({ team, TeamUpdated }: Props) => {
    const [teamName, setTeamName] = useState<string>(team.teamName);
    const [selectedPlayers, setSelectedPlayers] = useState<Array<Player>>(team.players);
    const [players, setPlayers] = useState<Array<Player>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const playersData = await PlayerService.getAllPlayers();
            setPlayers(await playersData.json());
        };
        fetchData();
    }, []);

    const handleUpdateTeam = async () => {
        if (!teamName || !team.id) return;

        const updatedTeam: Team = {
            id: team.id,
            teamName,
            coach: team.coach,
            players: selectedPlayers,
        };

        await TeamService.updateTeam(updatedTeam);
        TeamUpdated();
    };

    const togglePlayerSelection = (player: Player) => {
        setSelectedPlayers((prevSelected) =>
            prevSelected.find((p) => p.id === player.id)
                ? prevSelected.filter((p) => p.id !== player.id)
                : [...prevSelected, player],
        );
    };

    const oldTeamName = team.teamName;

    return (
        <div>
            <h2>Edit Team - {oldTeamName}</h2>
            <input
                type="text"
                placeholder="New Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
            />

            <h3>Select Players</h3>
            {players.map((player) => (
                <div key={player.id}>
                    <input
                        type="checkbox"
                        checked={!!selectedPlayers.find((p) => p.id === player.id)}
                        onChange={() => togglePlayerSelection(player)}
                    />
                    {player.firstName} {player.lastName}
                </div>
            ))}

            <button onClick={handleUpdateTeam}>Update Team</button>
        </div>
    );
};

export default TeamEditor;
