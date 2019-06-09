import { Station } from './Station';

export class Line{
    Id:number
    Name:string
    Number:number
    LineTypeId:number
    Stations: Station[] = [];
}