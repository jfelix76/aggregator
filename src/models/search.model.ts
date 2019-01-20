import { IRequest } from '../interfaces/agg.interface';
import { IsNotEmpty } from 'class-validator';

export class RequestModel implements IRequest {

    searchType?: string;
    searchText?: string;
    url: string;

    @IsNotEmpty()
    startPage: number;

    @IsNotEmpty()
    limitPage: number;

}
