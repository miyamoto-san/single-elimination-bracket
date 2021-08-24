import { useAtom } from "jotai";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./common";
import { colors } from "./common/style";
import { notificationAtom } from "./Notification";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  padding: 1em;
  input {
    margin: 0.2em 0;
    border: 2px solid ${colors.lightgrey};
    border-radius: 0.4em;
    line-height: 1.4em;
    font-size: 1em;
    background: ${colors.darkgrey};
    padding: 0.2em 0.4em;
    outline: none;
    color: ${colors.white};
    max-width: 200px;
    &:hover,
    &:active,
    &:focus {
      border: 2px solid ${colors.primary};
    }
    &::placeholder {
      color: ${colors.white};
    }
  }
`;

interface AddTeamProps {
  teams: Team[][];
  addTeam: (teams: Team[]) => void;
  resetBracket: () => void;
}

function AddTeam({ teams, addTeam, resetBracket }: AddTeamProps) {
  const [, setNotification] = useAtom(notificationAtom);
  const [firstTeam, setFirstTeam] = useState<string>("");
  const [secondTeam, setSecondTeam] = useState<string>("");

  const checkForTeamNameDuplicate = () =>
    teams
      .map((team) =>
        team.every((t) => t.name !== firstTeam && t.name !== secondTeam)
      )
      .every((t) => t);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkForTeamNameDuplicate()) {
      setNotification("Team name must be unique");
      return;
    }
    if (firstTeam === secondTeam) {
      setNotification("Team name must be unique");
      return;
    }
    if (firstTeam.length === 0 || secondTeam.length === 0) {
      setNotification("Team name can't be empty");
      return;
    }
    addTeam([
      { name: firstTeam, winner: false },
      { name: secondTeam, winner: false },
    ]);
    setFirstTeam("");
    setSecondTeam("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setFirstTeam(e.target.value)}
        type="text"
        placeholder="Team name"
        value={firstTeam}
      />
      <input
        onChange={(e) => setSecondTeam(e.target.value)}
        type="text"
        placeholder="Team name"
        value={secondTeam}
      />
      <div>
        <Button whileTap={{ scale: 0.9 }} type="submit">
          Add
        </Button>
        <Button whileTap={{ scale: 0.9 }} type="button" onClick={resetBracket}>
          Reset Bracket
        </Button>
      </div>
    </Form>
  );
}

export default AddTeam;
