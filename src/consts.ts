export const beforeSongTime = 2000;
export const playingSongTime = 7000;
export const guessTime = 5000;
export const currentLevelKeyName = "currentLevel";
export const numberOfCorrectSongsKeyName = "numberOfCorrectSongs";

export interface IOption {
  correct: boolean;
  text: string;
}

export interface ISong {
  name: string;
  artist: string;
  fileName: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  youtubeStart: number;
  options: IOption[];
}

export const songs: ISong[] = [
  {
    name: "AS IF IT'S YOUR LAST",
    artist: "BLACKPINK",
    fileName: "waynes.mp3",
    youtubeUrl: "https://youtu.be/Amq-qlqbjYA?t=64",
    youtubeVideoId: "Amq-qlqbjYA",
    youtubeStart: 64,
    options: [
      { correct: false, text: "MOMOLAND - BBoom BBoom" },
      { correct: true, text: "BLACKPINK - AS IF IT'S YOUR LAST" },
      { correct: false, text: "TWICE - FANCY" },
      { correct: false, text: "TWICE - What is Love?" },
    ],
  },
  {
    name: "BBoom BBoom",
    artist: "MOMOLAND",
    fileName: "applicosph.mp3",
    youtubeUrl: "https://youtu.be/JQGRg8XBnB4?t=68",
    youtubeVideoId: "JQGRg8XBnB4",
    youtubeStart: 68,
    options: [
      { correct: false, text: "2NE1 - LONELY" },
      { correct: false, text: "ITZY - ICY" },
      { correct: false, text: "TWICE - TT" },
      { correct: true, text: "MOMOLAND - BBoom BBoom" },
    ],
  },
];
