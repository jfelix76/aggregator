import { Injectable } from '@nestjs/common';
import { Guid } from "guid-typescript";

const fs = require('fs');

@Injectable()
export class DownloadService {

    name: string;

    constructor() {}

    async getImage(page: any, url: string) {
        
        var viewSource = await page.goto(url);
        fs.writeFile(this.getFileName(), await viewSource.buffer(), function(err) {
            if (err) {
                return console.log(err);
            }

            console.log('The file was saved!', name);
        });
    }

    private getFileName() {
        let guid = Guid.create();
        return `${guid.toString()}.png`;
    }
    
}