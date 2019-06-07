import { BaseHttpService } from '../http/base-http.service';
import { Station } from 'src/app/models/Station';
import { Injectable } from '@angular/core';

@Injectable()
export class GetAllStationsHttpService extends BaseHttpService<Station[]>{
    specificUrl = "/api/Stations"
}

@Injectable()
export class AddStationHttpService extends BaseHttpService<Station>{
    specificUrl = "/api/Stations"
}

@Injectable()
export class ChangeStationHttpService extends BaseHttpService<Station>{
    specificUrl="/api/Stations";
}

@Injectable()
export class DeleteStationHttpService extends BaseHttpService<any>{
    specificUrl="/api/Stations"
}