const form = document.getElementById("startForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const passwordOrPhraseInput = document.getElementById("passwordOrPhrase");
  const passwordOrPhrase = passwordOrPhraseInput.value;
  const timeLimit = document.getElementById("timelimit").value;
  const timeLimitMs = convertTimeLimitToMs(timeLimit);

  //setter passwordOrPhraseInput som ingenting12
  passwordOrPhraseInput.value = "";

  //Sender alert i nettleser og via webhook når tiden går ut
  const timeoutID = setTimeout(() => {
    sendAlertToDiscordWebhook(passwordOrPhrase);
    alert("Tiden er ute og en varsel har blitt sendt!");
  }, timeLimitMs);

  //Henter og setter countdown til html fra updateCountdownFuntion.js
  const countdownElement = document.getElementById("countdown");
  let countdownSeconds = Math.floor(timeLimitMs / 1000);
  updateCountdownText(countdownSeconds);

  //Oppdaterer resterende tid
  const countdownInterval = setInterval(() => {
    countdownSeconds--;

    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = "";
    } else {
      updateCountdownText(countdownSeconds);
    }
  }, 1000);

  //Henter verdien i keyInput når passord er skrevet inn og submitKey er trykket på
  const submitKeyButton = document.getElementById("submitKey");
  submitKeyButton.addEventListener("click", () => {
    const keyInput = document.getElementById("keyInput");
    const enteredKey = keyInput.value;

    //Om passord eller "phrase" er skriv inn riktig før tiden er gått ut, stopp timeren og det blir ikke sendt noen varsling
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
