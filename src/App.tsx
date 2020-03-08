import React, { useState } from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import { HomeScreen } from './Screens/HomeScreen';
import { GameScreen } from './Screens/GameScreen';
import { theme } from './Utils/theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SupportScreen } from './Screens/SupportScreen';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center',

    paddingRight: 0,
    paddingLeft: 0,

    height: '100%',
  },
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/support">
            <Container className={classes.container}>
              <SupportScreen></SupportScreen>
            </Container>
          </Route>
          <Route>
            <Container
              className={clsx(classes.container, classes.gameContainer)}
            >
              <div>
                {appState === AppState.Game && (
                  <GameScreen setAppState={setAppState} />
                )}
                {appState === AppState.Home && (
                  <HomeScreen setAppState={setAppState} />
                )}
              </div>
            </Container>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
