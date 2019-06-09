import { BaseHttpService } from '../http/base-http.service';
import { Line } from 'src/app/models/Line';
import { Injectable } from '@angular/core';

@Injectable()
export class LineHttpService extends BaseHttpService<Line>{
    specificUrl = "/api/Lines"
}

@Injectable()
export class DeleteLineHttpService extends BaseHttpService<Line> {
    specificUrl = "api/Lines/"
}