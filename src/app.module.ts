import { Module } from '@nestjs/common';
import { AggController } from './controllers/agg.controller';
import { AggService } from './services/agg.service';
import { MongooseModule } from '@nestjs/mongoose';
import { memberSchema } from './schemas/member.schema';

import { accessTokenSchema } from './schemas/access-token.schema';

import { AppEnvironment } from './app.environment';
import { PageNavigationService } from 'services/page-navigation.service';

@Module({
    imports: [
        MongooseModule.forRoot(AppEnvironment.dbHost),
        MongooseModule.forFeature([
            { name: 'Member', schema: memberSchema },
            { name: 'AccessToken', schema: accessTokenSchema },
        ])
    ],
    controllers: [
        AggController
    ],
    providers: [
        AggService,
        PageNavigationService
    ]
})
export class AppModule { }
