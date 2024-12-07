import Header from "@/components/header";
import TeamOverviewTable from "@/components/teams/TeamOverviewTable";
import TeamPlayers from "@/components/teams/TeamPlayers";
import TeamService from "@/services/TeamService";
import { Team } from "@/types";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Array<Team>>();
  const [selectedTeam, setSelectedTeam] = useState<Team>();

  const router = useRouter();

  const getTeams = async () => {
    const response = await TeamService.getAllTeams();
    const teams = await response.json();
    setTeams(teams);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const createTeamRoute = async () => {
    router.push("/teams/create");
  };

  

  return (
    <>
      <Head>
        <title>Teams - TeamTrack</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Teams</h1>
        <section>
          <h2>Team overview</h2>
          {teams && <TeamOverviewTable teams={teams} selectTeam={setSelectedTeam} />}
        </section>
        {selectedTeam && (
            <section>
                <h2>
                    Players in {selectedTeam.teamName}:
                </h2>
                {selectedTeam.players && (
                    <TeamPlayers players={selectedTeam.players} />)}            
            </section>
                )}
        <button onClick={createTeamRoute}>Create Team</button>
      </main>
    </>
  );
};

export default Teams;
