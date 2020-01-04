import { currentLevelKeyName, numberOfCorrectSongsKeyName } from "../consts";

export const getCurrentSongNumber = (): number => {
  const localStorageValue = localStorage.getItem(currentLevelKeyName);

  if (!localStorageValue) {
    return 1;
  }

  const number = parseInt(localStorageValue, 10);

  return number;
};

export const getNumberOfCorrectSongs = (): number => {
  const localStorageValue = localStorage.getItem(numberOfCorrectSongsKeyName);

  if (!localStorageValue) {
    return 0;
  }

  const number = parseInt(localStorageValue, 10);

  return number;
};
