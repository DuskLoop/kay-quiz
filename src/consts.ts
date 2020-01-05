export const beforeSongTime = 2000;
export const playingSongTime = 7000;
export const guessTime = 10000;
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
  youtubeVideoId: string;
  youtubeStart: number;
  options: IOption[];
}

export const songs: ISong[] = [
  {
    name: "LIKEY",
    artist: "TWICE",
    fileName: "TWICE - LIKEY.mp3",
    youtubeVideoId: "V2hlQkVJZhE",
    youtubeStart: 80,
    options: [
      { correct: false, text: "TWICE - Feel Special" },
      { correct: false, text: "Red Velvet - Red Flavor" },
      { correct: false, text: "I.O.I - Very Very Very" },
      { correct: true, text: "TWICE - LIKEY" },
    ],
  },
  {
    name: "DNA",
    artist: "BTS",
    fileName: "BTS - DNA.mp3",
    youtubeVideoId: "MBdVXkSdhwU",
    youtubeStart: 103,
    options: [
      { correct: false, text: "Stray Kids - Levanter" },
      { correct: true, text: "BTS - DNA" },
      { correct: false, text: "FTISLAND - Take Me Now" },
      { correct: false, text: "ATEEZ - WONDERLAND" },
    ],
  },
  {
    name: "HANN (Alone)",
    artist: "(G)I-DLE",
    fileName: "GIDLEHANN.mp3",
    youtubeVideoId: "OKNXn2qCEws",
    youtubeStart: 65,
    options: [
      { correct: true, text: "(G)I-DLE - HANN (Alone)" },
      { correct: false, text: "MAMAMOO - Egotistic" },
      { correct: false, text: "TWICE - TT" },
      { correct: false, text: "T-ARA - So Crazy" },
    ],
  },
  {
    name: "Say My Name",
    artist: "ATEEZ",
    fileName: "ATEEZ - Say My Name.mp3",
    youtubeVideoId: "1gQ_-Jp5o7o",
    youtubeStart: 84,
    options: [
      { correct: false, text: "BTS - FAKE LOVE" },
      { correct: false, text: "B.A.P - HONEYMOON" },
      { correct: true, text: "ATEEZ - Say My Name" },
      { correct: false, text: "B.A.P - WARRIOR" },
    ],
  },
  {
    name: "LET'S NOT FALL IN LOVE",
    artist: "BIGBANG",
    fileName: "BIGBANG - LET'S NOT FALL IN LOVE.mp3",
    youtubeVideoId: "9jTo6hTZmiQ",
    youtubeStart: 77,
    options: [
      { correct: false, text: "BTS - Spring Day" },
      { correct: false, text: "Wanna One - Energetic" },
      { correct: false, text: "BIGBANG - Blue" },
      { correct: true, text: "BIGBANG - LET'S NOT FALL IN LOVE" },
    ],
  },
  {
    name: "AS IF IT'S YOUR LAST",
    artist: "BLACKPINK",
    fileName: "BLACKPINK - AS IF IT'S YOUR LAST.mp3",
    youtubeVideoId: "Amq-qlqbjYA",
    youtubeStart: 64,
    options: [
      { correct: true, text: "BLACKPINK - AS IF IT'S YOUR LAST" },
      { correct: false, text: "MOMOLAND - BAAM" },
      { correct: false, text: "TWICE - TT" },
      { correct: false, text: "TWICE - Feel Special" },
    ],
  },
  {
    name: "Blood Sweat & Tears",
    artist: "BTS",
    fileName: "BTS - Blood Sweat & Tears.mp3",
    youtubeVideoId: "hmE9f-TEutc",
    youtubeStart: 118,
    options: [
      { correct: false, text: "BIGBANG - BAE BAE" },
      { correct: false, text: "GOT7 - A" },
      { correct: true, text: "BTS - Blood Sweat & Tears" },
      { correct: false, text: "ATEEZ - Answer" },
    ],
  },
  {
    name: "Love Shot",
    artist: "EXO",
    fileName: "EXO - Love Shot.mp3",
    youtubeVideoId: "pSudEWBAYRE",
    youtubeStart: 47,
    options: [
      { correct: false, text: "BTS - Not Today" },
      { correct: false, text: "SHINee - Lucifer" },
      { correct: false, text: "SHINee - View" },
      { correct: true, text: "EXO - Love Shot" },
    ],
  },
  {
    name: "The Boys",
    artist: "Girls' Generation",
    fileName: "Girls' Generation - The Boys.mp3",
    youtubeVideoId: "6pA_Tou-DPI",
    youtubeStart: 145,
    options: [
      { correct: false, text: "Girls' Generation - I GOT A BOY" },
      { correct: false, text: "T-ARA - SUGAR FREE" },
      { correct: true, text: "Girls' Generation - The Boys" },
      { correct: false, text: "Red Velvet - Bad Boy" },
    ],
  },
  {
    name: "Kill This Love",
    artist: "BLACKPINK",
    fileName: "BLACKPINK - Kill This Love.mp3",
    youtubeVideoId: "2S24-y0Ij3Y",
    youtubeStart: 45,
    options: [
      { correct: false, text: "BLACKPINK - DDU-DU DDU-DU" },
      { correct: true, text: "BLACKPINK - Kill This Love" },
      { correct: false, text: "BLACKPINK - PLAYING WITH FIRE" },
      { correct: false, text: "BLACKPINK - BOOMBAYAH" },
    ],
  },
  {
    name: "Just right",
    artist: "GOT7",
    fileName: "GOT7 - Just right.mp3",
    youtubeVideoId: "vrdk3IGcau8",
    youtubeStart: 61,
    options: [
      { correct: false, text: "Stray Kids - MIROH" },
      { correct: true, text: "GOT7 - Just right" },
      { correct: false, text: "Monsta X - Follow" },
      { correct: false, text: "EXO - Lotto" },
    ],
  },
  {
    name: "ICY",
    artist: "ITZY",
    fileName: "ITZY - ICY.mp3",
    youtubeVideoId: "zndvqTc4P9I",
    youtubeStart: 50,
    options: [
      { correct: false, text: "Weki Meki - Tiki-Taka(99%)" },
      { correct: false, text: "EVERGLOW - Adios" },
      { correct: true, text: "ITZY - ICY" },
      { correct: false, text: "LOONA - Butterfly" },
    ],
  },
  {
    name: "HIP",
    artist: "MAMAMOO",
    fileName: "MAMAMOO - HIP.mp3",
    youtubeVideoId: "KhTeiaCezwM",
    youtubeStart: 56,
    options: [
      { correct: false, text: "(G)I-DLE - Senorita" },
      { correct: true, text: "MAMAMOO - HIP" },
      { correct: false, text: "MOMOLAND - Thumbs Up" },
      { correct: false, text: "Red Velvet - Zimzalabim" },
    ],
  },
  {
    name: "BBoom BBoom",
    artist: "MOMOLAND",
    fileName: "MOMOLAND - BBoom BBoom.mp3",
    youtubeVideoId: "JQGRg8XBnB4",
    youtubeStart: 68,
    options: [
      { correct: false, text: "2NE1 - LONELY" },
      { correct: false, text: "ITZY - ICY" },
      { correct: true, text: "MOMOLAND - BBoom BBoom" },
      { correct: false, text: "TWICE - TT" },
    ],
  },
  {
    name: "LIT",
    artist: "ONEUS",
    fileName: "ONEUS - LIT.mp3",
    youtubeVideoId: "ggPF6Wb8A50",
    youtubeStart: 61,
    options: [
      { correct: false, text: "ATEEZ - HALA HALA" },
      { correct: false, text: "SUPER JUNIOR - I Think I" },
      { correct: true, text: "ONEUS - LIT" },
      { correct: false, text: "Stray Kids - Get Cool" },
    ],
  },
  {
    name: "Psycho",
    artist: "Red Velvet",
    fileName: "Red Velvet - Psycho.mp3",
    youtubeVideoId: "uR8Mrt1IpXg",
    youtubeStart: 57,
    options: [
      { correct: false, text: "Apink - Eung Eung" },
      { correct: false, text: "Red Velvet - Umpah Umpah" },
      { correct: false, text: "KARD - Dumb Litty" },
      { correct: true, text: "Red Velvet - Psycho" },
    ],
  },
  {
    name: "Fear",
    artist: "SEVENTEEN",
    fileName: "SEVENTEEN - Fear.mp3",
    youtubeVideoId: "ap14O5-G7UA",
    youtubeStart: 56,
    options: [
      { correct: false, text: "DAY6 - Sweet Chaos" },
      { correct: true, text: "SEVENTEEN - Fear" },
      { correct: false, text: "Monsta X - MIDDLE OF THE NIGHT" },
      { correct: false, text: "Winner - AH YEAH" },
    ],
  },
  {
    name: "WAKE ME UP",
    artist: "B.A.P",
    fileName: "NOTATIONBAPNOTATION - WAKE ME UP.mp3",
    youtubeVideoId: "Ku_FYERiHC8",
    youtubeStart: 58,
    options: [
      { correct: false, text: "SHINee - Lucifer" },
      { correct: false, text: "Block B - HER" },
      { correct: true, text: "B.A.P - WAKE ME UP" },
      { correct: false, text: "NU'EST - LOVE ME" },
    ],
  },
  {
    name: "My Pace",
    artist: "Stray Kids",
    fileName: "Stray Kids - My Pace.mp3",
    youtubeVideoId: "pok5yDw77uM",
    youtubeStart: 81,
    options: [
      { correct: true, text: "Stray Kids - My Pace" },
      { correct: false, text: "THE BOYZ - TATTOO" },
      { correct: false, text: "NCT U - BOSS" },
      { correct: false, text: "The Rose - RED" },
    ],
  },
  {
    name: "FANCY",
    artist: "TWICE",
    fileName: "TWICE - FANCY.mp3",
    youtubeVideoId: "kOHB85vDuow",
    youtubeStart: 60,
    options: [
      { correct: false, text: "ITZY - DALLA DALLA" },
      { correct: true, text: "TWICE - FANCY" },
      { correct: false, text: "BLACKPINK - WHISTLE" },
      { correct: false, text: "GFRIEND - Fever" },
    ],
  },
];
