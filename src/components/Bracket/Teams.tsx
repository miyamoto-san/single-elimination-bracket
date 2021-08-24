import React from "react";

import { Checkbox } from "../common";

interface TeamsProps {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  winner: boolean;
  team: Team[];
}

function Teams({ handler, name, winner, team }: TeamsProps) {
  return (
    <tr>
      <td className="teamName">{name}</td>
      <td className="checkBox">
        <Checkbox handler={handler} checked={winner} team={team} />
      </td>
    </tr>
  );
}

export default Teams;
