import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { IMemberDocument } from '../interfaces/member.interface';



@Injectable()
export class AggService {
    constructor(
        // private authenService: JwtAuthenService,
        // @InjectModel('Member') private memberCollection: Model<IMemberDocument>
    ) {}

    // register
    async onRequest(body: any) {
        console.log('it works onRequest')
    }

}
