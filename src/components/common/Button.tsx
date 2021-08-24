import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "./style";

const Button = styled(motion.button)`
  border: 2px solid ${colors.primary};
  border-radius: 1.4em;
  line-height: 1.4em;
  font-size: 0.8em;
  background: ${colors.primary};
  padding: 0.5em 1em;
  outline: none;
  color: ${colors.white};
  margin-top: 1em;
  margin-right: 1em;
  text-transform: uppercase;
`;

export default Button;
