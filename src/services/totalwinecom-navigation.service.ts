import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { unlink } from 'fs';

const SEARCH_SELECTOR = '#at_searchProducts';
const TYPEAHEAD_SELECTOR = 'a[name="SUGGESTED_SEARCH_TERM"]';
const OF_AGE_YES_BUTTON = '#btnYes';

@Injectable()
export class TotalWineComNavigationService {

    constructor() {
        
    }

    async traverse(browser: any, url: string, term: string) {
        const page = await browser.newPage();
        await page.waitFor(1000);
        await page.goto(url);
        await page.waitFor(1000);
        
        await page.goto(`${url}/ageGate/userResponse?_=1551147041427`);

        await page.goBack();
        
        let data = [];
        await page.type(SEARCH_SELECTOR, term, { delay: 300 });

        let href = await page.$eval(TYPEAHEAD_SELECTOR, el => el.href);

        console.info('navigating to: ', href);
        
        // https://www.totalwine.com/search/all?text=Honig&tab=fullcatalog

        await page.goto(`${href}/&tab=fullcatalog`);

        let results = await page.evaluate(() => {
            let items = [...document.querySelectorAll('ul.plp-list > li')];
            
            return items;
        });

        for (let i=0; i<=results.length-1; i++) {
            data[i] = await this.scrape(page, data, i);
        }
            
        // store data off at mongo
        // console.log('final data', data);
    }

    private async scrape(page, data, index) {
        let link = '', image = '', winemakerNotes = '', acclaim = '', winery = '', region = '', variety = '';

        // get search results - nth item
        try {
            let ul = await page.$(`.plp-list`);
            link = await ul.$(`li:nth-child(${index+1})`)
            console.info('what is link now', link);
            // await page.goto(link);
        } catch (ex) { 
            console.info('Link not found'); 
        }

        // get label - need to download
        // try {
        //     image = await page.$eval('picture > img', img => img.src);
        // } catch (ex) {
        //     console.info('Image not found.');
        // }
        
        // console.log('*** image', image)

        // get winemaker notes
        // try {
        //     winemakerNotes = await page.$eval('div[data-ref="tab0"]', notes => notes.innerText);
        // } catch (ex) {
        //     console.info('Winemaker notes not found.');
        // }
        
        // // console.log('**** notes', winemakerNotes)

        // // get critical acclaim
        // try {
        //     acclaim = await page.$eval('div[data-ref="tab1"]', acc => acc.innerText);
        // } catch (ex) {
        //     console.info('Critical acclaim not found');
        // }

        // // console.log('***** acclaim', acclaim);

        // // get winery but only the first tiem
        // try {
        //     winery = await page.$eval('div[data-ref="tab2"]', vintner => vintner.innerText);
        // } catch (ex) {
        //     console.info('Winery not found.');
        // }
        
        // // console.log('****** vintner', winery);

        // // get region
        // try {
        //     region = await page.$eval('.productPageContent > section > div.productPageContent_bodyTextMain', appellation => appellation.innerHTML);
        // } catch (ex) {
        //     console.info('Region not found.');
        // }
        
        // // get region
        // try {
        //     variety = await page.$eval('.productPageContentContainer > .productPageContent > section > div[itemprop="description"]', grape => grape.innerHTML);
        // } catch (ex) {
        //     console.info('Varietal not found.');
        // }
        
        // console.log('******* region', region);

        await page.goBack({ waitUntil: 'domcontentloaded' });

        return data = {
            link,
            image,
            winemakerNotes,
            acclaim,
            winery,
            region,
            variety
        };

    }
}