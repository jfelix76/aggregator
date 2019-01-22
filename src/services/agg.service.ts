import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
// import { IMemberDocument } from '../interfaces/member.interface';

const SEARCH_SELECTOR = '.searchBarForm_input';
const TYPEAHEAD_SELECTOR = '.searchTypeAheadList_itemLink';

@Injectable()
export class AggService {

    wineDotComUrl = 'https://www.wine.com/';

    constructor(
        // private authenService: JwtAuthenService,
        // @InjectModel('Member') private memberCollection: Model<IMemberDocument>
    ) {}

    // register
    async onSearch(browser: any, term: string) {
        const page = await browser.newPage();
        await page.goto(this.wineDotComUrl);

        // await page.select('.state_select', 'CA')
            
        // page.waitFor(10000);

        await page.type(SEARCH_SELECTOR, term, {delay: 300});

        let href = await page.$eval(TYPEAHEAD_SELECTOR, el => el.href);

        console.info('navigating to: ', href);
        
        await page.goto(href);

        await page.select('.state_select', 'CA')

        let result = await page.$eval('.prodList > li', (els) => els);
        //     let data = [];
        //     // let items = document.querySelectorAll('.prodItem');
            
        //     // els.forEach((item, index) => {
        //     //     let image = document.querySelector('img');
        //     //     let title = document.querySelector('prodItemInfo_name');
        //     //     let varietal = document.querySelector('prodItemInfo_varietal');
        //     //     let origin = document.querySelector('prodItemInfo_originText');

        //     //     data.push({
        //     //         image,
        //     //         title,
        //     //         varietal,
        //     //         origin
        //     //     });
        //     // });
        //     console.info('returning data... ', els);
            
        //     return data;
        // });


        // await page.evaluate((selector) => {

        //     console.log('what is selector', selector)
        // });
        console.log('what the fack is result', result)
        return null;
    }

}
