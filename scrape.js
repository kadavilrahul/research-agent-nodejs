const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const url = 'https://apps.abacus.ai/chatllm/';
  const username = 'kadavil.rahul@gmail.com';
  const password = 'Karimpadam4@';
  const outputFile = 'output.txt';

  try {
    await page.goto(url);

    // Login
    try {
      await page.waitForSelector('input[type="email"]', { timeout: 60000 });
      await page.fill('input[type="email"]', username);
      console.log('Username entered');
      await page.waitForSelector('input[type="password"]', { timeout: 60000 });
      await page.fill('input[type="password"]', password);
      console.log('Password entered');
      await page.click('button[type="submit"]');
      console.log('Login button clicked');

      // Wait for navigation after login
      await page.waitForNavigation();

      // Scrape content
      const content = await page.content();

      // Save to file
      fs.writeFileSync(outputFile, content);

      console.log(`Content scraped and saved to ${outputFile}`);
    } catch (error) {
      console.error('An error occurred during login or scraping:', error);
    }
  } finally {
    await browser.close();
  }
})();
