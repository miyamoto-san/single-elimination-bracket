import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

import { Bracket } from "./components";
import AddTeam from "./components/AddTeam";
import { colors } from "./components/common/style";
import { Notification } from "./components/Notification";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background: ${colors.bgColor};
  }
`;

const Header = styled.header`
  width: 100%;
  height: 50px;
  background: ${colors.darkgrey};
  border-bottom: 1px solid ${colors.lightgrey};
  p {
    margin: 0;
    padding: 0 1.25em;
    display: flex;
    align-items: center;
    height: 100%;
    text-transform: uppercase;
    font-size: 0.8em;
    color: ${colors.white}
  }
`;

const Container = styled.div`
  margin: 0 auto;
`;

function App() {
  const [teams, setTeams] = useState<Team[][]>([]);
  const addTeam = (teams: Team[]) => {
    setTeams((prevState) => {
      prevState.push(teams);
      return [...prevState];
    });
  };

  const resetBracket = () => {
    setTeams([]);
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <p>Johan's Single Elimination Bracket</p>
      </Header>
      <Container>
        <Notification />
        {teams.length >= 1 && <Bracket startingTeams={teams} />}
        <AddTeam teams={teams} addTeam={addTeam} resetBracket={resetBracket} />
      </Container>
    </>
  );
}

export default App;
