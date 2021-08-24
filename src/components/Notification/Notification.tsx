import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { atom, useAtom } from "jotai";
import { motion } from "framer-motion";
import { colors } from "../common/style";

export const notificationAtom = atom("");

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${colors.danger};
  color: ${colors.white};
  padding: 1em;
  z-index: 9999;
`;

const CloseIcon = styled.div`
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGlkPSJjbG9zZSI+CiAgICAgICAgPHBhdGggaWQ9IngiIGQ9Ik0xOC43MTcgNi42OTdsLTEuNDE0LTEuNDE0LTUuMzAzIDUuMzAzLTUuMzAzLTUuMzAzLTEuNDE0IDEuNDE0IDUuMzAzIDUuMzAzLTUuMzAzIDUuMzAzIDEuNDE0IDEuNDE0IDUuMzAzLTUuMzAzIDUuMzAzIDUuMzAzIDEuNDE0LTEuNDE0LTUuMzAzLTUuMzAzeiIvPgogICAgPC9nPgo8L3N2Zz4K);
  background-size: cover;
  height: 20px;
  width: 20px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1em;
  right: 0.5em;
  background: none;
  border: none;
`;

function Notification() {
  const [message, setMessage] = useAtom(notificationAtom);
  let timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => {
      clearTimeout(timeout.current as NodeJS.Timeout);
    };
  }, [message, setMessage]);

  const closeNotification = () => {
    setMessage("");
    clearTimeout(timeout.current as NodeJS.Timeout);
  };

  if (message.length) {
    return (
      <Container
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.26,
          type: "spring",
          stiffness: 80
        }}
        initial={{ opacity: 0, y: -100 }}
      >
        {message}
        <CloseBtn onClick={closeNotification}>
          <CloseIcon />
        </CloseBtn>
      </Container>
    );
  }
  return <div />;
}

export default Notification;
