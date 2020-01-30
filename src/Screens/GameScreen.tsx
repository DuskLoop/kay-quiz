import React, { useEffect, Dispatch, SetStateAction, useReducer } from 'react';
import {
  beforeSongTime,
  songs,
  playingSongTime,
  guessTime,
  IOption,
  currentLevelKeyName,
  numberOfCorrectSongsKeyName,
} from '../consts';
import { BeforeSongScreen } from './GameScreens/BeforeSongScreen';
import { PlayingSongScreen } from './GameScreens/PlayingSongScreen';
import { GuessScreen } from './GameScreens/GuessScreen';
import { AnswerScreen } from './GameScreens/AnswerScreen';
import { fadeIn, fadeOut } from '../Utils/AudioUtils';
import { GameCompletedScreen } from './GameScreens/GameCompletedScreen';
import {
  getCurrentSongNumber,
  getNumberOfCorrectSongs,
} from '../Utils/localStorageUtils';
import { AppState } from '../App';

interface IProps {
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export enum GameState {
  beforeSong,
  playingSong,
  guess,
  answer,
  gameCompleted,
}

interface IGameScreenState {
  gameState: GameState;
  songNumber: number;
  guess: IOption | null;
}

export type Action =
  | { type: 'playSong' }
  | { type: 'endSong' }
  | { type: 'guess'; guess: IOption }
  | { type: 'timeOut' }
  | { type: 'nextSong' }
  | { type: 'restart' };

const initializer = (): IGameScreenState => {
  const songNumber = getCurrentSongNumber();

  if (songNumber > songs.length) {
    return {
      gameState: GameState.gameCompleted,
      guess: null,
      songNumber: songNumber,
    };
  } else {
    startBeforeSong(songNumber).then(() => {
      dispatchGlobal({ type: 'playSong' });
    });

    return {
      gameState: GameState.beforeSong,
      guess: null,
      songNumber: songNumber,
    };
  }
};

const reducer = (state: IGameScreenState, action: Action): IGameScreenState => {
  if (action.type === 'guess') {
    const newSongNumber = state.songNumber + 1;

    localStorage.setItem(currentLevelKeyName, newSongNumber.toString());
    if (action.guess.correct) {
      localStorage.setItem(
        numberOfCorrectSongsKeyName,
        (getNumberOfCorrectSongs() + 1).toString(),
      );
    }

    if (guessTimerGlobal) {
      clearTimeout(guessTimerGlobal);
    }

    return { ...state, gameState: GameState.answer, guess: action.guess };
  } else if (action.type === 'playSong') {
    fadeIn(audio);
    setTimeout(() => {
      dispatchGlobal({ type: 'endSong' });
    }, playingSongTime);

    return { ...state, gameState: GameState.playingSong };
  } else if (action.type === 'endSong') {
    fadeOut(audio);

    guessTimerGlobal = setTimeout(() => {
      dispatchGlobal({ type: 'timeOut' });

      const newSongNumber = state.songNumber + 1;
      localStorage.setItem(currentLevelKeyName, newSongNumber.toString());
    }, guessTime);

    return { ...state, gameState: GameState.guess };
  } else if (action.type === 'timeOut') {
    return { ...state, gameState: GameState.answer, guess: null };
  } else if (action.type === 'nextSong') {
    const nextSongNumber = state.songNumber + 1;

    if (nextSongNumber > songs.length) {
      return {
        ...state,
        gameState: GameState.gameCompleted,
        songNumber: nextSongNumber,
      };
    } else {
      startBeforeSong(nextSongNumber).then(() => {
        dispatchGlobal({ type: 'playSong' });
      });

      return {
        ...state,
        songNumber: nextSongNumber,
        gameState: GameState.beforeSong,
        guess: null,
      };
    }
  } else if (action.type === 'restart') {
    startBeforeSong(1).then(() => {
      dispatchGlobal({ type: 'playSong' });
    });

    return { songNumber: 1, gameState: GameState.beforeSong, guess: null };
  } else {
    throw Error(`Unknown action: ${action}`);
  }
};

const audio = new Audio();
audio.volume = 0;

const startBeforeSong = (songNumber: number) => {
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

  return Promise.all([canPlayThroughPromise, waitPromise]);
};

let dispatchGlobal: Dispatch<Action> = () => {
  console.log('Dispatch not set');
};

let guessTimerGlobal: NodeJS.Timeout | undefined;

export const GameScreen: React.FC<IProps> = props => {
  const [{ gameState, guess, songNumber }, dispatch] = useReducer(
    reducer,
    null,
    initializer,
  );

  dispatchGlobal = dispatch;

  useEffect(() => {
    return () => {
      fadeOut(audio);
    };
  }, []);

  if (gameState === GameState.beforeSong) {
    return <BeforeSongScreen songNumber={songNumber} />;
  } else if (gameState === GameState.playingSong) {
    return <PlayingSongScreen songNumber={songNumber} />;
  } else if (gameState === GameState.guess) {
    return (
      <GuessScreen
        songNumber={songNumber}
        dispatch={dispatch}
        guessTimeout={guessTimerGlobal}
      />
    );
  } else if (gameState === GameState.answer) {
    return (
      <AnswerScreen dispath={dispatch} songNumber={songNumber} guess={guess} />
    );
  } else if (gameState === GameState.gameCompleted) {
    return (
      <GameCompletedScreen
        dispatch={dispatch}
        setAppState={props.setAppState}
      />
    );
  } else {
    throw Error(`Unknown game state: ${gameState}`);
  }
};
