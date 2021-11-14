const puppeteer = require("puppeteer");
const util = require("util");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://pharma-consults.net/pharmacies-gardes");

  const arrayCities = await page.evaluate(() => {
    const fieldsMaping = {
      label: 0,
      director: 1,
      tel: 2,
      location: 3,
      map: 4,
      dateStart: 5,
      dateEnd: 6,
    };

    const tableResponsive = document.querySelector("div.table-responsive");
    const trs = [...tableResponsive.querySelectorAll("h5")];
    const tables = [...tableResponsive.querySelectorAll(`table`)];

    return trs.map((hrs, index) => {
      const result = {
        commune: "",
        pharmacies: [],
      };

      result.commune = hrs.innerText;

      const subTrs = [...tables[index].querySelectorAll(".odd")];

      result.pharmacies = subTrs.map((subTr) => {
        const tds = [...subTr.querySelectorAll("td")];

        return {
          label: tds[fieldsMaping.label].innerText,
          director: tds[fieldsMaping.director].innerText,
          tel: tds[fieldsMaping.tel].innerText,
          location: tds[fieldsMaping.location].innerText,
          map: tds[fieldsMaping.map].innerText,
          dateStart: tds[fieldsMaping.dateStart].innerText,
          dateEnd: tds[fieldsMaping.dateEnd].innerText,
        };
      });

      return result;
    });
  });
  const all = util.inspect(arrayCities, false, null, true /* enable colors */);
  console.log("arrayCities", all);
  // console.log(util.inspect(arrayCities, false, null, true /* enable colors */));

  // Array of cities [{}, {}, {}]
  const arrayPharmacies = await page.evaluate(() => {
    const tableResponsive = document.querySelector("div.table-responsive");

    const tables = tableResponsive.querySelectorAll("table");
    const divsArr = [...tables];

    return divsArr.map((table) => {
      const trs = [...table.querySelectorAll(".odd")];
      return trs.map((trs) => {
        const tds = [...trs.querySelectorAll("td")];
        return tds.map((td) => td.innerText);
      });
    });
  });
  // console.log("arrayPharmacies", arrayPharmacies);

  await browser.close();
})();
