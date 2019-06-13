import { Station } from './Station';
import { LineType } from './LineType';

export class Line{
    Id:number
    Name:string
    Number:number
    LineTypeId:number
    Stations: Station[] = [];
    LineType: LineType;
}