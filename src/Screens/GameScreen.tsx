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
} from "../consts";
import { BeforeSongScreen } from "./GameScreens/BeforeSongScreen";
import { PlayingSongScreen } from "./GameScreens/PlayingSongScreen";
import { GuessScreen } from "./GameScreens/GuessScreen";
import { AnswerScreen } from "./GameScreens/AnswerScreen";
import { fadeIn, fadeOut } from "../Utils/AudioUtils";
import { GameCompletedScreen } from "./GameScreens/GameCompletedScreen";
import { getCurrentSongNumber } from "../Utils/localStorageUtils";

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

  audio.src = `songs/${songs[songNumber - 1].fileName}`;

  const canPlayThroughPromise = new Promise(resolve => {
    audio.oncanplaythrough = () => {
      resolve();
    };
  });

  const waitPromise = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, beforeSongTime);
  });

  Promise.all([canPlayThroughPromise, waitPromise]).then(() => {
    startPlayingSong(setGameState, songNumber, guessTimeout);
  });
};

const startPlayingSong = (
  setGameState: Dispatch<SetStateAction<GameState>>,
  songNumber: number,
  guessTimeout: MutableRefObject<NodeJS.Timeout | null>,
) => {
  setGameState(GameState.playingSong);

  fadeIn(audio);
  setTimeout(() => {
    startGuess(setGameState, guessTimeout, songNumber);
  }, playingSongTime);
};

const startGuess = (
  setGameState: Dispatch<SetStateAction<GameState>>,
  guessTimeout: MutableRefObject<NodeJS.Timeout | null>,
  songNumber: number,
) => {
  setGameState(GameState.guess);
  fadeOut(audio);

  guessTimeout.current = setTimeout(() => {
    startAnswer(setGameState);

    const newSongNumber = songNumber + 1;
    localStorage.setItem(currentLevelKeyName, newSongNumber.toString());
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

  const nextSong = () => {
    const newSongNumber = songNumber + 1;
    setSongNumber(newSongNumber);
    setGuess(null);
  };

  if (gameState === GameState.beforeSong) {
    return <BeforeSongScreen songNumber={songNumber} />;
  } else if (gameState === GameState.playingSong) {
    return (
      <PlayingSongScreen setGameState={setGameState} songNumber={songNumber} />
    );
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
