const puppeteer = require("puppeteer");

async function scrapeRates(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  let rates = [];
  if (url.includes("riamoneytransfer")) {
    rates = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".exchange-rate-row"));
      return rows.map(row => ({
        currency: row.querySelector(".currency-name").textContent.trim(),
        rate: parseFloat(row.querySelector(".exchange-rate").textContent.trim()),
      }));
    });
  } else if (url.includes("transfertchapchap")) {
    rates = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".rate-row"));
      return rows.map(row => ({
        currency: row.querySelector(".currency").textContent.trim(),
        rate: parseFloat(row.querySelector(".rate").textContent.trim()),
      }));
    });
  }

  await browser.close();
  return rates;
}

module.exports = { scrapeRates };
