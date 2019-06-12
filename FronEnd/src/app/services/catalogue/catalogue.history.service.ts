import { BaseHttpService } from '../http/base-http.service';
import { CatalogueHistory } from 'src/app/models/CatalogueHistory';

export class GetValidCatagoues extends BaseHttpService<CatalogueHistory[]>{
    specificUrl = "/api/CatalogueHistories/ValidCatalogues";
}

export class PostValidCatagoues extends BaseHttpService<CatalogueHistory[]>{
    specificUrl = "/api/CatalogueHistories";
}