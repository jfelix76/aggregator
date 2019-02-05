import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
// import { IMemberDocument } from '../interfaces/member.interface';

const SEARCH_SELECTOR = '.searchBarForm_input';
const TYPEAHEAD_SELECTOR = '.searchTypeAheadList_itemLink';
const LISTITEM_SELECTOR = ''

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

        let data = [];
            
        // page.waitFor(10000);

        await page.type(SEARCH_SELECTOR, term, {delay: 300});

        let href = await page.$eval(TYPEAHEAD_SELECTOR, el => el.href);

        console.info('navigating to: ', href);
        
        await page.goto(href);

        // await page.select('.state_select', 'CA');

        // let result = await page.evaluate('.prodList > li', (els) => els);
        let results = await page.evaluate(() => {
            let items = [...document.querySelectorAll('ul.prodList > li')];
            
            return items;
        });

        let link = await page.$eval('ul.prodList > li:nth-child(2) > .prodItem_wrap > .prodItemImage > a', link => link.href);
        await page.goto(link);

        await page.select('.state_select', 'CA');

        // get label
        let image = await page.$eval('picture > img', img => img.src);

        console.log('*** image', image)

        // get winemaker notes
        let winemakerNotes = await page.$eval('.pipWineNotes_copy > div.viewMoreModule_text', notes => notes.innerText);
    
        console.log('**** notes', winemakerNotes)

        // get critical acclaim
        let acclaim = await page.$eval('.pipProfessionalReviews_review > div.pipSecContent_copy', acc => acc.innerText);

        console.log('***** acclaim', acclaim);

        // get winery but only the first tiem
        let winery = await page.$eval('div.pipWinery_copy > div.viewMoreModule_text', vintner => vintner.innerText);

        console.log('****** vintner', winery);

        // get region
        let region = await page.$eval('.productPageContent > section > div.productPageContent_bodyTextMain', reg => reg.innerHTML);

        console.log('******* region', region)

        // TODO: still need to grab varietal/tasting shit
        // let variety = await page.$eval('.productPageContent > section > div.productPageContent_bodyTextMain', variety => variety.innerHTML);

        // console.log('******** varietal', variety)

        return null;
    }

}
