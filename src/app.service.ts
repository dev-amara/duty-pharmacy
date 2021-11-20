import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { LocalitiesService } from './app/localities/localities.service';
import { PharmaciesService } from './app/pharmacies/pharmacies.service';

@Injectable()
export class AppService {
  constructor(
    private localityService: LocalitiesService,
    private pharmacyService: PharmaciesService,
  ) {}

  async scrap() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
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

      const regex = new RegExp('@(.*),(.*),');

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

        result.pharmacies = allTrOfH5.map((subTr, index) => {
          const allTd = [...subTr.querySelectorAll('td')];

          const lon_lat_match = Object.assign(
            {},
            allTd[fieldsMaping.map].firstChild.toString().match(regex),
          );
          const fieldsMapingMap = { lon: 1, lat: 2 };

          const long = lon_lat_match[fieldsMapingMap.lon] || null;
          const lat = lon_lat_match[fieldsMapingMap.lat] || null;

          return {
            id: index + 1,
            label: allTd[fieldsMaping.label].innerText.toUpperCase().trim(),
            director: allTd[fieldsMaping.director].innerText
              .toUpperCase()
              .trim(),
            tel: allTd[fieldsMaping.tel].innerText.trim(),
            location: allTd[fieldsMaping.location].innerText.trim(),
            long,
            lat,
            dateStart: allTd[fieldsMaping.dateStart].innerText.trim(),
            dateEnd: allTd[fieldsMaping.dateEnd].innerText.trim(),
            communeId: result.id,
          };
        });

        return result;
      });
    });

    // console.log(util.inspect(arrayCities, false, null, true /* enable colors */));

    await browser.close();
    await this.localityService.deleteMany();
    await this.pharmacyService.deleteMany();

    listOfDutyPharmacies.map(async (obj) => {
      const locality = await this.localityService.create({
        commune: obj.commune,
      });

      obj.pharmacies.map(async (pharmacy) => {
        await this.pharmacyService.create({
          ...pharmacy,
          locality_id: locality._id,
        });
      });
    });

    return 'OK';
  }
}
