import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { CatalogueInfo } from 'src/app/models/CatalogueInfo';
import { Catalogue } from 'src/app/models/Catalogue';
import { CatalogueBindingModel } from 'src/app/models/CatalogueBindingModel';

@Injectable()
export class CatalogueHttpService extends BaseHttpService<CatalogueInfo>{
    specificUrl = "/api/Catalogues/CatalogueInfo"
}

@Injectable()
export class GetCatalogueHttpService extends BaseHttpService<Catalogue[]>{
    specificUrl = "/api/Catalogues"
}

@Injectable()
export class PostCatalogueHttpService extends BaseHttpService<CatalogueBindingModel>{
    specificUrl = "/api/Catalogues/CatalogueAndCatalogueHistory"
}