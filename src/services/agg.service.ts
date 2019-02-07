import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PageNavigationService } from './page-navigation.service';

@Injectable()
export class AggService {

    private wineDotComUrl = 'https://www.wine.com/';

    constructor(
        // private authenService: JwtAuthenService,
        // @InjectModel('Member') private memberCollection: Model<IMemberDocument>,
        public pageNavigationService: PageNavigationService
    ) {}

    // register
    async onSearch(browser: any, term: string, source: string) {
        
        if (source === 'winedotcom') {
            await this.pageNavigationService.traverseWineDotCom(browser, this.wineDotComUrl, term);
        }

        return null;
    }

}
