import { Get, Controller, Post } from '@nestjs/common';
import { AggService } from '../services/agg.service';

@Controller()
export class AggController {
    constructor(private readonly aggService: AggService) { }

    @Get()
    root() {
        return {
            Message: 'Hello Node js web api'
        }
    }
}
