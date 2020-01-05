import React, { useState } from "react";
import {
  CssBaseline,
  Container,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { HomeScreen } from "./Screens/HomeScreen";
import { GameScreen } from "./Screens/GameScreen";
import { theme } from "./Utils/theme";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",

    paddingRight: 0,
    paddingLeft: 0,
  },
}));

export enum AppState {
  Home,
  Game,
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Home);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.container}>
        {appState === AppState.Game && <GameScreen setAppState={setAppState} />}
        {appState === AppState.Home && <HomeScreen setAppState={setAppState} />}
      </Container>
    </ThemeProvider>
  );
};

export default App;
