import PlayerService from '@services/PlayerService';
import { Player } from '../../types';

type Props = {
    players: Array<Player>;
};

const TeamPlayers: React.FC<Props> = ({ players }: Props) => {
    return (
        <>
            {players && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={index} role="button">
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TeamPlayers;
