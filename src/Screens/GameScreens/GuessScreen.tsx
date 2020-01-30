import React, { Dispatch } from 'react';
import { songs, guessTime } from '../../consts';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Action } from '../GameScreen';

interface IProps {
  songNumber: number;
  dispatch: Dispatch<Action>;
  guessTimeout: NodeJS.Timeout | undefined;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  timerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '5px',
    backgroundColor: theme.palette.primary.main,
    animationFillMode: 'forwards',
    animation: `$timerBarColor ${guessTime /
      1000}s ease, $timerBarWidth ${guessTime / 1000}s linear`,
  },
  '@keyframes timerBarColor': {
    '0%': { backgroundColor: theme.palette.primary.main, right: 0 },
    '50%': { backgroundColor: theme.palette.primary.main, right: '70vw' },
    '100%': { backgroundColor: 'red', right: '100vw' },
  },
  '@keyframes timerBarWidth': {
    from: { right: 0 },
    to: { right: '100vw' },
  },
}));

export const GuessScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  const song = songs[props.songNumber - 1];

  return (
    <>
      {props.songNumber === 1 && (
        <Typography color="primary" variant="h4" gutterBottom>
          What song did you hear?
        </Typography>
      )}
      <div className={classes.container}>
        {song.options.map(option => {
          return (
            <Button
              onClick={() => {
                props.dispatch({ type: 'guess', guess: option });
              }}
              key={option.text}
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              {option.text}
            </Button>
          );
        })}
      </div>
      <div className={classes.timerBar}></div>
    </>
  );
};
