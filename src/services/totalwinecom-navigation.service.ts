import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { unlink } from 'fs';
import { DownloadService } from './download.service';

const SEARCH_SELECTOR = '#at_searchProducts';
const TYPEAHEAD_SELECTOR = 'a[name="SUGGESTED_SEARCH_TERM"]';
const OF_AGE_YES_BUTTON = '#btnYes';

@Injectable()
export class TotalWineComNavigationService {

    constructor(private downloadService: DownloadService) {}

    async traverse(browser: any, url: string, term: string) {
        const page = await browser.newPage();
        await page.waitFor(1000);
        await page.goto(url);
        await page.waitFor(1000);
        
        // this may need to go away -- actually pressing yes on the agegate
        await page.goto(`${url}/ageGate/userResponse?_=1551147041428`);

        await page.goBack();
        
        let data = [];
        await page.type(SEARCH_SELECTOR, term, { delay: 300 });

        let href = await page.$eval(TYPEAHEAD_SELECTOR, el => el.href);

        console.info('navigating to: ', href);

        await page.goto(`${href}/&tab=fullcatalog`);

        let results = await page.evaluate(() => {
            let items = [...document.querySelectorAll('ul.plp-list > li')];
            
            return items;
        });
        // skip 1st child here
        for (let i=2; i<results.length+2; i++) {
            data[i] = await this.scrape(page, data, i);
        }
            
        // store data off at mongo
        console.log('final data', data);
    }

    private async scrape(page, data, index) {
        let link: any, imageUrl = '', winemakerNotes = '', acclaim = '', winery = '', region = '', variety = '';

        // get search results - nth item
        try {
            await page.waitFor(1000);
            link = await page.$eval(`ul.plp-list > li:nth-child(${index}) > div > div > div > a`, a => a.href);
            await page.waitFor(1000);
            // console.info('**** what is el now', li);
            await page.goto(link);
        } catch (ex) { 
            console.info('Link not found'); 
        }

        // get label - need to download
        try {
            imageUrl = await page.$eval('picture > img', img => img.src);
            await this.downloadService.getImage(page, imageUrl);
            await page.goBack({ waitUntil: 'domcontentloaded' });
        } catch (ex) {
            console.info('Image not found.');
        }

        // get winemaker notes
        try {
            winemakerNotes = await page.$eval('.detailsTabReview__2wHgUkc_ > div', notes => notes.innerText);
        } catch (ex) {
            console.info('Winemaker notes not found.');
        }

        // // get region
        try {
            region = await page.$eval('.tab__3OKZPWu7 > div > div > p', appellation => appellation.innerText);
        } catch (ex) {
            console.info('Region not found.');
        }
        
        // // get variety
        try {
            variety = await page.$eval('.tab__3OKZPWu7.selected__2ORWU449 > div > div', grape => grape.innerText);
        } catch (ex) {
            console.info('Varietal not found.');
        }

        await page.goBack({ waitUntil: 'domcontentloaded' });

        return data = {
            link,      
            winemakerNotes,
            region,
            variety
        };

    }
}