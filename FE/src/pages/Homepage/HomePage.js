import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import styles from "./styles";

import SlideCardNewsCard from "../../layout/main/NewsEvent/NewsEvent";
import Heroes from "../../layout/main/Heroes/Heroes";
import InforTeacher from "../../layout/main/InforTeacher/InforTeacher";
import Partner from "../../layout/main/Partner/Partner";
import LookUpScore from "../../layout/main/LookUpScore/LookUpScore";
import GoldenBoard from "../../layout/main/GoldenBoard/GoldenBoard";

const HomePage = () => {
  return (
    <ThemeProvider theme={styles}>
      <CssBaseline />
      <Heroes />
      <SlideCardNewsCard />
      <LookUpScore />
      <InforTeacher />
      <GoldenBoard />
      <Partner />
    </ThemeProvider>
  );
};

export default HomePage;
