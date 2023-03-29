//Denne funsjonen konverterer tid
export function convertTimeLimitToMs(timeLimit) {
    const unit = timeLimit.slice(-1);
    const value = parseInt(timeLimit.slice(0, -1));
  
    switch (unit) {
      case "s":
        return value * 1000;
      case "m":
        return value * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "d":
        return value * 24 * 60 * 60 * 1000;
      default:
        throw new Error("Error. Bruk s, m, h, or d.");
    }
  }