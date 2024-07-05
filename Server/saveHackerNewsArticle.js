import { chromium } from "playwright";
import { sendEmail } from "./utils/sendEmail.js";
import { saveFile } from "./utils/saveFile.js";
import { extractData } from "./utils/extractData.js";

// Main function to save Hacker News articles
export async function saveHackerNewsArticles(promptAnswers, io) {
  try {
    io.emit("loading", "Waking up the server...");

    // Save user's input on the number of articles to retrieve and whether to include additional data
    let numberOfArticles = promptAnswers.numberOfArticles;
    let isGettingAdditionalData = promptAnswers.additionalData;

    // Launch browser
    console.log("Launching browser...");
    io.emit("loading", "Launching browser...");

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to Hacker News
    console.log("Waiting for Hacker News...");
    io.emit("loading", "Waiting for Hacker News...");

    await page.goto("https://news.ycombinator.com");

    // Extract data from Hacker News using the reusable extractData function
    const { initialData, additionalData } = await extractData(
      page,
      numberOfArticles,
      isGettingAdditionalData,
      io
    );

    // Combine the initial data and additional data if requested
    let combinedData;
    if (isGettingAdditionalData) {
      combinedData = initialData
        .map((initialData, index) => ({
          ...initialData,
          ...additionalData[index],
        }))
        .slice(0, numberOfArticles); // Limit the data to the number of articles requested by the user
    } else {
      combinedData = initialData.slice(0, numberOfArticles); // Limit the data to the number of articles requested by the user
    }

    // Create file path to save data file
    const filePath = `top_articles.${promptAnswers.outputFormat.toLowerCase()}`;

    // Save the combined data to a file in the specified format (CSV or JSON) using the reusable saveFile function
    await saveFile(filePath, combinedData, promptAnswers.outputFormat, io);

    // Send email with attached data file if user requested it
    if (promptAnswers.email) {
      console.log("Sending the requested data file to your email...");
      io.emit("loading", "Sending the requested data file to your email...");

      await sendEmail(filePath, promptAnswers.email);

      console.log("Email has been sent successfully!");
      io.emit("loading", "Email has been sent successfully!");
    }

    await browser.close();
    return combinedData;
  } catch (error) {
    console.error("An error occurred: ", error);
  }
}
