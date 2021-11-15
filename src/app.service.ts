import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getHello() {
    const browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();
    await page.goto('https://pharma-consults.net/pharmacies-gardes');

    const listOfDutyPharmacies = await page.evaluate(() => {
      const fieldsMaping = {
        label: 0,
        director: 1,
        tel: 2,
        location: 3,
        map: 4,
        dateStart: 5,
        dateEnd: 6,
      };

      const tableResponsive = document.querySelector('div.table-responsive');
      const allH5 = [...tableResponsive.querySelectorAll('h5')];
      const tables = [...tableResponsive.querySelectorAll(`table`)];

      return allH5.map((h5, index) => {
        const result = {
          id: 0,
          commune: '',
          pharmacies: [],
        };

        result.commune = h5.innerText.toUpperCase();
        result.id = index + 1;

        const allTrOfH5 = [...tables[index].querySelectorAll('.odd')];

        result.pharmacies = allTrOfH5.map((subTr) => {
          const allTd = [...subTr.querySelectorAll('td')];

          return {
            label: allTd[fieldsMaping.label].innerText.toUpperCase().trim(),
            director: allTd[fieldsMaping.director].innerText
              .toUpperCase()
              .trim(),
            tel: allTd[fieldsMaping.tel].innerText.trim(),
            location: allTd[fieldsMaping.location].innerText.trim(),
            map: allTd[fieldsMaping.map].innerText.trim(),
            dateStart: allTd[fieldsMaping.dateStart].innerText.trim(),
            dateEnd: allTd[fieldsMaping.dateEnd].innerText.trim(),
          };
        });

        return result;
      });
    });

    // console.log(util.inspect(arrayCities, false, null, true /* enable colors */));

    await browser.close();

    return listOfDutyPharmacies;
  }
}
