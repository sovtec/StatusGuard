//Denne funsjonen kjører async og sender "alert" til webHook
import { webhookURL } from "../webHookURL.js";
export async function sendAlertToDiscordWebhook(passwordOrPhrase) {
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
