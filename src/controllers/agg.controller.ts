import { Get, Controller, Post } from '@nestjs/common';
import { AggService } from '../services/agg.service';

import * as puppeteer from 'puppeteer';
import { Result } from 'range-parser';

@Controller('api/agg')
export class AggController {
    url: string;
    constructor(private readonly aggService: AggService) { }

    @Get()
    root() {
        return {
            Message: 'Hello Node js web api'
        }
    }

    @Get('details')
    async getWineDetails() {
        this.url = 'https://www.wine.com/product/frias-family-vineyard-sauvignon-blanc-2014/184940'
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        let result = await page.goto(this.url);

        console.log('result', result);

        await page.waitFor(2000);

        browser.close();
        return result.json;
    }

}
