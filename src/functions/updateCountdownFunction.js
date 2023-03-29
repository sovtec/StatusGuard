//Denne funsjonen regner ut og viser resterende tid
export function updateCountdownText(countdownSeconds) {
    const hours = Math.floor(countdownSeconds / 3600);
    const minutes = Math.floor((countdownSeconds % 3600) / 60);
    const seconds = countdownSeconds % 60;
    document.getElementById(
      "countdown"
    ).textContent = `Skriv inn valgt passord. Resterende tid ${hours}h ${minutes}m ${seconds}s`;
  }