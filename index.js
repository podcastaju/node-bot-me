const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Create a new WebDriver instance
// const driver = new Builder().forBrowser("chrome").build();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function openWebsiteInMultipleTabs(tabCount = 3) {
  while (true) {
    try {
      const driver = await new Builder().forBrowser("chrome").build();
      const windowHandles = [];

      // Open the first tab
      await driver.get("https://youtube-views.ytpremium35.repl.co/");
      console.log("First tab opened successfully!");
      windowHandles.push(await driver.getWindowHandle());

      // Open additional tabs
      for (let i = 1; i < tabCount; i++) {
        await driver.switchTo().newWindow("tab");
        console.log(`Tab ${i + 1} opened successfully!`);
        windowHandles.push(await driver.getWindowHandle());
      }

      // Execute openWebsite() in each tab
      for (const handle of windowHandles) {
        await driver.switchTo().window(handle);
        await openWebsite(driver);
        console.log("openWebsite() executed in a tab!");
      }

      // Close the driver after 2 minutes
      await delay(120000);
      await driver.quit();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

// Open a website
async function openWebsite(driver) {
  try {
    await driver.get("https://youtube-views.ytpremium35.repl.co/"); // Replace with your desired website URL
    console.log("Website opened successfully!");

    // Find the text field by its ID
    const textField = await driver.findElement({ id: "urlvideo" }); // Replace 'yourTextFieldId' with the actual ID of the text field

    // Enter a value into the text field
    await textField.sendKeys("https://youtu.be/G8D_1H1E-N0");

    const textField1 = await driver.findElement({ id: "nbrvideo" });
    await textField1.clear();
    await textField1.sendKeys("10");

    console.log("Value entered successfully!");

    // Find the button by CSS selector
    const button = await driver.findElement(
      By.xpath('//td/button[@onclick="play();"]')
    ); // Modify the XPath expression to match the specific button on the website

    // Press the button
    await button.click();

    await delay(10000);

    const iframes = await driver.findElements(By.tagName("iframe"));

    for (const iframe of iframes) {
      await driver.switchTo().frame(iframe);

      const playButton = await driver.findElement(
        By.css(".ytp-large-play-button")
      );
      await playButton.click();

      await driver.switchTo().defaultContent();
    }

    console.log("Play buttons pressed successfully for all videos!");
  } catch (error) {
    console.error("Error opening website:", error);
  } finally {
    // await driver.quit(); // Close the browser
  }
}

openWebsiteInMultipleTabs();
