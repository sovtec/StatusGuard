const webhookURL =
  "https://discord.com/api/webhooks/1090609190214569984/MSOxE995OyxWyCMymSjFsg00TyZiGooA7SXOEFLrXhlSJlLjaLJQkRmO3iFLTUtV6jjZ";

const form = document.getElementById("startForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const passwordOrPhraseInput = document.getElementById("passwordOrPhrase");
  const passwordOrPhrase = passwordOrPhraseInput.value;
  const timeLimit = document.getElementById("timelimit").value;
  const timeLimitMs = convertTimeLimitToMs(timeLimit);

  //setter passwordOrPhraseInput som ingenting
  passwordOrPhraseInput.value = "";

  const timeoutID = setTimeout(() => {
    sendAlertToDiscordWebhook(passwordOrPhrase);
    alert("Tiden er ute og en varsel har blitt sendt!");
  }, timeLimitMs);

  const countdownElement = document.getElementById("countdown");
  let countdownSeconds = Math.floor(timeLimitMs / 1000);
  updateCountdownText(countdownSeconds);

  const countdownInterval = setInterval(() => {
    countdownSeconds--;

    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = "";
    } else {
      updateCountdownText(countdownSeconds);
    }
  }, 1000);

  const submitKeyButton = document.getElementById("submitKey");
  submitKeyButton.addEventListener("click", () => {
    const keyInput = document.getElementById("keyInput");
    const enteredKey = keyInput.value;

    if (enteredKey === passwordOrPhrase) {
      clearTimeout(timeoutID);
      clearInterval(countdownInterval);
      countdownElement.textContent = "";
      alert("Nedtelling stoppet!");
      keyInput.value = "";
      location.reload();
    }
  });
});

function updateCountdownText(countdownSeconds) {
  const hours = Math.floor(countdownSeconds / 3600);
  const minutes = Math.floor((countdownSeconds % 3600) / 60);
  const seconds = countdownSeconds % 60;
  document.getElementById(
    "countdown"
  ).textContent = `Skriv inn valgt passord. Resterende tid ${hours}h ${minutes}m ${seconds}s`;
}

function convertTimeLimitToMs(timeLimit) {
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

async function sendAlertToDiscordWebhook(passwordOrPhrase) {
  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Hey! This person has not responded to ther own status timer and probably needs assistance. Please check in to verify that they are not in need of assistance`,
      }),
    });
    console.log("Alert sent to webhook.");
  } catch (error) {
    console.error("Failed to send alert to webhook:", error.message);
  }
}
