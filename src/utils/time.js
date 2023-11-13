
const ONE_SECOND_IN_MILLISECONDS = 1000;

export function getHours (time) {
  return Math.floor((time / ONE_SECOND_IN_MILLISECONDS / 60 / 60) % 60);
}

export function getMinutes (time) {
  const min = Math.floor((time / ONE_SECOND_IN_MILLISECONDS / 60) % 60);

  return min.toString().padStart(2, 0);
}

export function getSeconds (time) {
  const s = Math.floor((time / ONE_SECOND_IN_MILLISECONDS) % 60);

  return s.toString().padStart(2, 0);
}

export function getMilliseconds (time) {
  const ms = Math.floor(time % ONE_SECOND_IN_MILLISECONDS);

  return ms.toString().padStart(3, 0)
}

export function getElapsedTime(time, includeMs = false) {
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  const milliseconds = getMilliseconds(time)

  if(includeMs) {
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
  
  return `${hours}:${minutes}:${seconds}`;
}

export function getElapsedSeconds(time) {
  return Math.floor(time / ONE_SECOND_IN_MILLISECONDS);
}