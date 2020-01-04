import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";
import {
  beforeSongTime,
  songs,
  playingSongTime,
  guessTime,
  IOption,
  currentLevelKeyName,
  numberOfCorrectSongsKeyName,
} from "../consts";
import { BeforeSongScreen } from "./GameScreens/BeforeSongScreen";
import { PlayingSongScreen } from "./GameScreens/PlayingSongScreen";
import { GuessScreen } from "./GameScreens/GuessScreen";
import { AnswerScreen } from "./GameScreens/AnswerScreen";
import { fadeIn, fadeOut } from "../Utils/AudioUtils";
import { GameCompletedScreen } from "./GameScreens/GameCompletedScreen";
import {
  getCurrentSongNumber,
  getNumberOfCorrectSongs,
} from "../Utils/localStorageUtils";

interface IProps {}

export enum GameState {
  beforeSong,
  playingSong,
  guess,
  answer,
  gameCompleted,
}

const audio = new Audio();
audio.volume = 0;

const startBeforeSong = (
  setGameState: Dispatch<SetStateAction<GameState>>,
  songNumber: number,
  guessTimeout: MutableRefObject<NodeJS.Timeout | null>,
) => {
  setGameState(GameState.beforeSong);
  setTimeout(() => {
    startPlayingSong(setGameState, songNumber, guessTimeout);
  }, beforeSongTime);
};

const startPlayingSong = (
  setGameState: Dispatch<SetStateAction<GameState>>,
  songNumber: number,
  guessTimeout: MutableRefObject<NodeJS.Timeout | null>,
) => {
  setGameState(GameState.playingSong);
  audio.src = `songs/${songs[songNumber - 1].fileName}`;

  fadeIn(audio);
  setTimeout(() => {
    startGuess(setGameState, guessTimeout);
  }, playingSongTime);
};

const startGuess = (
  setGameState: Dispatch<SetStateAction<GameState>>,
  guessTimeout: MutableRefObject<NodeJS.Timeout | null>,
) => {
  setGameState(GameState.guess);
  fadeOut(audio);

  guessTimeout.current = setTimeout(() => {
    startAnswer(setGameState);
  }, guessTime);
};

const startAnswer = (setGameState: Dispatch<SetStateAction<GameState>>) => {
  setGameState(GameState.answer);
};

export const GameScreen: React.FC<IProps> = props => {
  const [songNumber, setSongNumber] = useState<number>(getCurrentSongNumber());
  const [gameState, setGameState] = useState<GameState>(GameState.beforeSong);
  const [guess, setGuess] = useState<IOption | null>(null);

  const guessTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (songNumber > songs.length) {
      setGameState(GameState.gameCompleted);
    } else {
      startBeforeSong(setGameState, songNumber, guessTimeout);
    }

    return () => {
      fadeOut(audio);
    };
  }, [songNumber, setGameState]);

  useEffect(() => {
    if (guess) {
      startAnswer(setGameState);
    }
  }, [guess]);

  const nextSong = (correct: boolean | undefined) => {
    const newSongNumber = songNumber + 1;
    setSongNumber(newSongNumber);
    localStorage.setItem(currentLevelKeyName, newSongNumber.toString());
    if (correct) {
      localStorage.setItem(
        numberOfCorrectSongsKeyName,
        (getNumberOfCorrectSongs() + 1).toString(),
      );
    }
    setGuess(null);
  };

  if (gameState === GameState.beforeSong) {
    return <BeforeSongScreen songNumber={songNumber} />;
  } else if (gameState === GameState.playingSong) {
    return <PlayingSongScreen setGameState={setGameState} />;
  } else if (gameState === GameState.guess) {
    return (
      <GuessScreen
        songNumber={songNumber}
        setGuess={setGuess}
        setGameState={setGameState}
        guessTimeout={guessTimeout}
      />
    );
  } else if (gameState === GameState.answer) {
    return (
      <AnswerScreen nextSong={nextSong} songNumber={songNumber} guess={guess} />
    );
  } else if (gameState === GameState.gameCompleted) {
    return <GameCompletedScreen setSongNumber={setSongNumber} />;
  } else {
    throw Error(`Unknown game state: ${gameState}`);
  }
};
