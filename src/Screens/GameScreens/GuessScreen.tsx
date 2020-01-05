import React, { Dispatch, SetStateAction, MutableRefObject } from "react";
import {
  songs,
  IOption,
  currentLevelKeyName,
  numberOfCorrectSongsKeyName,
  guessTime,
} from "../../consts";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { GameState } from "../GameScreen";
import { getNumberOfCorrectSongs } from "../../Utils/localStorageUtils";

interface IProps {
  songNumber: number;
  setGuess: Dispatch<SetStateAction<IOption | null>>;
  setGameState: Dispatch<SetStateAction<GameState>>;
  guessTimeout: MutableRefObject<NodeJS.Timeout | null>;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  timerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "5px",
    backgroundColor: theme.palette.primary.main,
    animationFillMode: "forwards",
    animation: `$timerBarColor ${guessTime /
      1000}s ease, $timerBarWidth ${guessTime / 1000}s linear`,
  },
  "@keyframes timerBarColor": {
    "0%": { backgroundColor: theme.palette.primary.main, right: 0 },
    "50%": { backgroundColor: theme.palette.primary.main, right: "70vw" },
    "100%": { backgroundColor: "red", right: "100vw" },
  },
  "@keyframes timerBarWidth": {
    from: { right: 0 },
    to: { right: "100vw" },
  },
}));

export const GuessScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  const song = songs[props.songNumber - 1];

  const guess = (option: IOption) => {
    props.setGuess(option);

    const newSongNumber = props.songNumber + 1;
    localStorage.setItem(currentLevelKeyName, newSongNumber.toString());
    if (option.correct) {
      localStorage.setItem(
        numberOfCorrectSongsKeyName,
        (getNumberOfCorrectSongs() + 1).toString(),
      );
    }

    if (props.guessTimeout.current) {
      clearTimeout(props.guessTimeout.current);
    }
  };

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
                guess(option);
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
