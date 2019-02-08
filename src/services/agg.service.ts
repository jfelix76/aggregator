import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { WineComNavigationService } from './winecom-navigation.service';
import { TotalWineComNavigationService } from './totalwinecom-navigation.service';

@Injectable()
export class AggService {

    private wineDotComUrl = 'https://www.wine.com/';
    private totalWineDotCom = 'https://www.totalwine.com/';

    constructor(
        private wineComNavigationService: WineComNavigationService,
        private totalWineComNavigationService: TotalWineComNavigationService
    ) {}

    // register
    async onSearch(browser: any, term: string, source: string) {
        
        if (source === 'winedotcom') {
            await this.wineComNavigationService.traverse(browser, this.wineDotComUrl, term);
        }

        if (source === 'totalwinedotcom') {
            await this.totalWineComNavigationService.traverse(browser, this.totalWineDotCom, term);
        }

        return null;
    }

}
