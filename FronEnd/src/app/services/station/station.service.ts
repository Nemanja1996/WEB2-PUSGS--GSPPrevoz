import { BaseHttpService } from '../http/base-http.service';
import { Station } from 'src/app/models/Station';

export class GetAllStationsHttpService extends BaseHttpService<Station[]>{
    specificUrl = "/api/Stations"
}