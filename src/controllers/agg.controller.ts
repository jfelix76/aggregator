import { Get, Controller, Post } from '@nestjs/common';
import { AggService } from '../services/agg.service';
import * as puppeteer from 'puppeteer';

@Controller('api/agg')
export class AggController {
    url: string;
    browser: any;
    constructor(private readonly aggService: AggService) { 
    }

    @Get()
    root() {
        return {
            Message: 'Hello Node js web api'
        }
    }

    @Get('details')
    async getWineDetails(url: string) {
        const browser = await puppeteer.launch({headless: false});
        
        await this.aggService.onSearch(browser, 'honig');
        
        return null;
    }

}
