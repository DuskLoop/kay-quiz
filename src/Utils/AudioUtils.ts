export async function adjustVolume(
  element: HTMLMediaElement,
  newVolume: number,
  {
    duration = 1000,
    easing = swing,
    interval = 13,
  }: {
    duration?: number;
    easing?: typeof swing;
    interval?: number;
  } = {},
) {
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;
  if (!delta || !duration || !easing || !interval) {
    element.volume = newVolume;
    return Promise.resolve();
  }
  const ticks = Math.floor(duration / interval);
  let tick = 1;
  return new Promise<void>(resolve => {
    const timer = setInterval(() => {
      element.volume = originalVolume + easing(tick / ticks) * delta;
      if (++tick === ticks) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
}

export function swing(p: number) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}

export const fadeOut = (audioEl: HTMLAudioElement): void => {
  adjustVolume(audioEl, 0, { duration: 1000 }).then(() => {
    audioEl.pause();
  });
};

export const fadeIn = (audioEl: HTMLAudioElement): void => {
  audioEl.play();
  adjustVolume(audioEl, 0.4, { duration: 500 });
};
