import { Coach } from '../model/coach';
import { Team } from '../model/team';
import database from './database';

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const teamPrisma = await database.team.findMany({
            include: { coach: true, players: true }
        });
        return teamPrisma.map((team: any) => Team.from(team));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getTeamsByCoach = async (coachId: number): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            where: { coachId },
            include: { coach: true, players: true }
        });
        return teamsPrisma.map((team: any) => Team.from(team));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const getTeamById = async (id: number): Promise<Team> => {
    try {
        const teamPrisma = await database.team.findUnique({
            where: { id },
            include: { coach: true, players: true }
        });
        if (!teamPrisma) {
            throw new Error('Team not found');
        }
        return Team.from(teamPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const createTeam = async (newTeam: Team): Promise<Team> => {
    try {
        const teamPrisma = await database.team.create({
            data: {
                teamName: newTeam.getTeamName(),
                coachId: newTeam.getCoach().getId()!,
                players: {
                    connect: newTeam.getPlayers().map(player => ({ id: player.getId() }))
                }
            },
            include: { coach: true, players: true }
        });
        return Team.from(teamPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

const updateTeam = async (updatedTeam: Team): Promise<Team> => {
    try {
        const teamPrisma = await database.team.update({
            where: { id: updatedTeam.getId()! },
            data: {
                teamName: updatedTeam.getTeamName(),
                coachId: 7,
                players: {
                    set: updatedTeam.getPlayers().map(player => ({ id: player.getId() }))
                }
            },
            include: { coach: true, players: true }
        });
        return Team.from({
            ...teamPrisma,
            players: teamPrisma.players,
            coach: teamPrisma.coach
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error, see server log for details.');
    }
};

export default { getAllTeams, getTeamsByCoach, getTeamById, createTeam, updateTeam };
