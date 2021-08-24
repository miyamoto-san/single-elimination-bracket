import React, { useEffect, useState } from "react";
import Round from "./Round";
import styled from "styled-components";
import { useAtom } from "jotai";
import { notificationAtom } from "../Notification";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Roboto", sans-serif;
  padding: 1em;
`;

interface RoundContainerProps {
  teams: number;
  hue: number;
}

const RoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5em;
  border: ${({ teams, hue }: RoundContainerProps) => {
    if (teams) {
      return `1px solid hsl(${70 * (hue + 1)}, 83%, 40%)`;
    }
    return "none";
  }};
  border-radius: 0.2em;
  &:first-child {
    margin 0;
    margin-right: 0.5em;
  }
`;

interface BracketProps {
  startingTeams: Team[][];
}

function Bracket({ startingTeams }: BracketProps) {
  // TODO: Always check if the number of teams is a power of 2
  const [bracket, setBracket] = useState<Team[][][]>([]);
  const [, setNotification] = useAtom(notificationAtom);

  const setWinner = (
    roundId: number,
    groupId: number,
    name: string,
    checked: boolean
  ) => {
    setBracket((prevState) => {
      prevState[roundId][groupId].map((team) => {
        if (team.name === name) {
          team.winner = checked;
        }
        return team;
      });

      return [...prevState];
    });
  };

  const submitWinners = (roundId: number) => {
    setBracket((prevState) => {
      if (Math.log2(prevState[0].length) % 1 !== 0) {
        setNotification("Not enough players");
        return prevState;
      }
      const prevWinner = prevState[roundId].map(
        (group) => group.filter((team) => team.winner)[0]
      );

      const groups: Team[][] = [];

      let groupId = 0;
      for (let x = 0; x < prevWinner.length; x++) {
        if (groups[groupId] === undefined) {
          groups[groupId] = [];
        }

        const team = { ...prevWinner[x] };
        team.winner = false;

        groups[groupId].push(team);

        if (!!(x % 2)) {
          groupId++;
        }
      }
      prevState[roundId + 1] = groups;

      return [...prevState];
    });
  };

  const handleBracket = (
    roundId: number,
    groupId: number,
    name: string,
    checked: boolean
  ) => {
    setWinner(roundId, groupId, name, checked);
    setBracket((prevState) => {
      const team = prevState[roundId].flatMap((value) => value);
      const decided = team.map((v) => v.winner);
      if (
        decided.filter(Boolean).length ===
        (prevState[roundId].length * 2) / 2
      ) {
        submitWinners(roundId);
      } else {
        prevState[roundId + 1] = [];
      }
      return [...prevState];
    });
  };

  useEffect(() => {
    setBracket([startingTeams]);
  }, [startingTeams]);

  return (
    <Container>
      {bracket.map((teams, roundId) => {
        return (
          <RoundContainer teams={teams.length} hue={roundId} key={`bracket-${roundId}`}>
            <Round
              roundId={roundId}
              teams={teams}
              handleBracket={handleBracket}
            />
          </RoundContainer>
        );
      })}
    </Container>
  );
}

export default Bracket;
