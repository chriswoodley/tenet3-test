export function between(min, max) {
  return (key, value) => {
    let val;

    if (typeof value === 'string') {
      val = Number(value.trim());
    } else {
      val = value;
    }
    
    if (val < min || val > max) {
      return `${key} must be between 2 and 10`;
    }
  }
}
