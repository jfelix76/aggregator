import { Module } from '@nestjs/common';
import { AggController } from './controllers/agg.controller';
import { AggService } from './services/agg.service';
import { MongooseModule } from '@nestjs/mongoose';
import { memberSchema } from './schemas/member.schema';

import { accessTokenSchema } from './schemas/access-token.schema';

import { AppEnvironment } from './app.environment';
import { WineComNavigationService } from 'services/winecom-navigation.service';
import { TotalWineComNavigationService } from 'services/totalwinecom-navigation.service';

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
        WineComNavigationService,
        TotalWineComNavigationService
    ]
})
export class AppModule { }
