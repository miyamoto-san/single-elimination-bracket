import React from "react";
import styled from "styled-components";
import { colors } from "./style";

const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover input ~ span {
    background: #ccc;
  }
  input:checked ~ span {
    background: ${colors.success};
  }
  input:disabled ~ span {
    background: #999;
    cursor: not-allowed;
  }
  input:checked ~ span:after {
    display: block;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 19px;
  width: 20px;
  background: #eee;
  border-top-right-radius: 0.1em;
  border-bottom-right-radius: 0.1em;
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

interface CheckboxProps {
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  team: Team[];
}

function Checkbox({ handler, checked, team }: CheckboxProps) {
  return (
    <Container>
      <Input
        onChange={handler}
        type="checkbox"
        checked={checked}
        disabled={team.length === 1}
      />
      <Checkmark />
    </Container>
  );
}

export default Checkbox;
