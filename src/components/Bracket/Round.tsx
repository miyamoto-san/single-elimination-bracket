import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Teams from "./Teams";
import { colors } from "../common/style";

const Table = styled(motion.table)`
  display: flex;
  flex-flow: column;
  tr {
    display: flex;
    background: #666;
    margin: 1em;
    padding: 0 0.5em;
    border-radius: 0.2em;
    td {
      display: flex;
      padding: 0;
      color: ${colors.white};
    }
  }
  .teamName {
    padding-right: 0.4em;
  }
  .checkBox {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
`;

interface RoundProps {
  teams: {
    name: string;
    winner: boolean;
  }[][];
  handleBracket: (
    roundId: number,
    groupId: number,
    teamName: string,
    checked: boolean
  ) => void;
  roundId: number;
}

function Round({ teams, handleBracket, roundId }: RoundProps) {
  return (
    <Container>
      {teams.map((team, groupId) => (
        <Table 
          key={`groupId-${groupId}`}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          initial={{ opacity: 0, y: -10 }}
        >
          <tbody>
            {team.map(({ name, winner }, i) => (
              <Teams
                key={`team-${name}-${i}`}
                handler={(e) =>
                  handleBracket(roundId, groupId, name, e.target.checked)
                }
                name={name}
                winner={winner}
                team={team}
              />
            ))}
          </tbody>
        </Table>
      ))}
    </Container>
  );
}

export default Round;
