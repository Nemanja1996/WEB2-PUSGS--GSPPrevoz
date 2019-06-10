import { CatalogueHistory } from './CatalogueHistory';

export class Catalogue{
    Id:number;
    ValidFrom: Date;
    ValidTo: Date;
    CatalogueHistories: CatalogueHistory[];
}