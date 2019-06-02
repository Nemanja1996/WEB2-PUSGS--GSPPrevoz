import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { CatalogueInfo } from 'src/app/models/CatalogueInfo';

@Injectable()
export class CatalogueHttpService extends BaseHttpService<CatalogueInfo>{
    specificUrl = "/api/Catalogues/CatalogueInfo"
}