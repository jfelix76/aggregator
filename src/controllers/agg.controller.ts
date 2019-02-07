import { Get, Controller, Post, Param, Query } from '@nestjs/common';
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
    async getWineDetails(@Query('type')type: string, @Query('term')term: string) {
        const browser = await puppeteer.launch({headless: false});
        
        await this.aggService.onSearch(browser, term, type);
        
        return null;
    }

}
