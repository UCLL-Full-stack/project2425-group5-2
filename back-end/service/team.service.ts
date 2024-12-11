import { te } from 'date-fns/locale';
import { Team } from '../model/team';
import coachDb from '../repository/coach.db';
import teamDb from '../repository/team.db';
import { TeamInput } from '../types/index';
import { Coach } from '../model/coach';
import { Player } from '../model/player';

const getAllTeams = async (): Promise<Team[]> => {
    return (await teamDb.getAllTeams()) || [];
};

const createTeam = async (team: TeamInput): Promise<Team> => {

    const players = team.players.map(playerInput => new Player(playerInput));

    const coach = new Coach(team.coach);

    const newTeam = new Team({
        teamName: team.teamName,
        coach,
        players,
    })

    const createdTeam = await teamDb.createTeam(newTeam);
    if (!createdTeam) {
        throw new Error('Team could not be created.');
    }
    return createdTeam;
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

const updateTeam = async (id: number, updatedTeam: TeamInput): Promise<Team> => {
    if (id == undefined) {
        throw new Error('An id is required.');
    }

    const team = await teamDb.getTeamById(id);

    if (team == undefined) {
        throw new Error('No team with that id exists.');
    }

    const players = updatedTeam.players.map(playerInput => new Player(playerInput));

    const coach = new Coach(updatedTeam.coach);

    const updatedTeamInstance = new Team({
        id,
        teamName: updatedTeam.teamName,
        coach,
        players,
    })

    const updatedTeamInDb = await teamDb.updateTeam(updatedTeamInstance);

    if (!updatedTeam) {
        throw new Error('Team could not be updated.');
    }

    return updatedTeamInDb;
};

export default { getAllTeams, getTeamsByCoach, getTeamById, createTeam, updateTeam };
