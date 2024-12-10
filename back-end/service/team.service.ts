import { te } from 'date-fns/locale';
import { Team } from '../model/team';
import coachDb from '../repository/coach.db';
import teamDb from '../repository/team.db';
import { TeamInput } from '../types/index';

const getAllTeams = async (): Promise<Team[]> => {
    return (await teamDb.getAllTeams()) || [];
};

const createTeam = async ({ teamName, players, coach }: TeamInput): Promise<Team> => {
    const allTeams = (await teamDb.getAllTeams()) || [];
    for (var team of allTeams) {
        if (teamName == team.getTeamName()) {
            throw new Error('Team with that name already exists.');
        }
    }
    if (players.length === 0) {
        throw new Error('Team must have at least one player.');
    }

    const createdTeam = new Team({ teamName, players, coach });

    return await teamDb.createTeam(createdTeam);
};

const getTeamById = async (id: number): Promise<Team> => {
    const team = await teamDb.getTeamById(id);

    if (!team) {
        throw new Error(`Team with id ${id} does not exist.`);
    }
    return team;
};

const getTeamsByCoach = async (coachId: number): Promise<Team[]> => {
    const teams = (await teamDb.getTeamsByCoach(coachId)) || [];

    if (teams.length === 0) {
        throw new Error('No teams found for that coach.');
    }

    if (coachId == undefined) {
        throw new Error('An id is required.');
    }

    return teams;
};

const updateTeam = async ({ id, teamName, coach, players }: TeamInput): Promise<Team> => {
    if (id == undefined) {
        throw new Error('An id is required.');
    }

    const team = await teamDb.getTeamById(id);

    if (team == undefined) {
        throw new Error('No team with that id exists.');
    }

    const updatedTeam = new Team({ id, teamName, coach, players });

    return await teamDb.updateTeam(updatedTeam);
};

export default { getAllTeams, getTeamsByCoach, getTeamById, createTeam, updateTeam };
