import { BaseHttpService } from '../http/base-http.service';
import { Line } from 'src/app/models/Line';
import { Injectable } from '@angular/core';
import { LineType } from 'src/app/models/LineType';

@Injectable()
export class LineHttpService extends BaseHttpService<Line>{
    specificUrl = "/api/Lines"
}
	
export class LineTypeService extends BaseHttpService<LineType>{
    specificUrl = "/api/LineTypes"
}