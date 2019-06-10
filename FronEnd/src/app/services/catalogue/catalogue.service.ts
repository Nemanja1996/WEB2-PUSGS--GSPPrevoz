import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { CatalogueInfo } from 'src/app/models/CatalogueInfo';
import { Catalogue } from 'src/app/models/Catalogue';

@Injectable()
export class CatalogueHttpService extends BaseHttpService<CatalogueInfo>{
    specificUrl = "/api/Catalogues/CatalogueInfo"
}

@Injectable()
export class GetCatalogueHttpService extends BaseHttpService<Catalogue[]>{
    specificUrl = "/api/Catalogues"
}