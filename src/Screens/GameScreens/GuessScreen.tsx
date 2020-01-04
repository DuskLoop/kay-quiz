import React, { Dispatch, SetStateAction, MutableRefObject } from "react";
import { songs, IOption } from "../../consts";
import { Button, makeStyles } from "@material-ui/core";
import { GameState } from "../GameScreen";

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
}));

export const GuessScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  const song = songs[props.songNumber - 1];

  const guess = (option: IOption) => {
    props.setGuess(option);
    if (props.guessTimeout.current) {
      clearTimeout(props.guessTimeout.current);
    }
  };

  return (
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
  );
};
