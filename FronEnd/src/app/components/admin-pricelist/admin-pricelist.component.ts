import { Component, OnInit } from '@angular/core';
import { Catalogue } from 'src/app/models/Catalogue';
import { GetCatalogueHttpService, CatalogueHttpService } from 'src/app/services/catalogue/catalogue.service';
import { CatalogueInfo } from 'src/app/models/CatalogueInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pricelist',
  templateUrl: './admin-pricelist.component.html',
  styleUrls: ['./admin-pricelist.component.css']
})
export class AdminPricelistComponent implements OnInit {

  Catalogues: Catalogue[] = []
  catalogueInfo:CatalogueInfo = null;
  selectedCatalogue: Catalogue = null;


  constructor(private httpCatalogue: GetCatalogueHttpService, private http: CatalogueHttpService, private router: Router) { }

  ngOnInit() {
    this.httpCatalogue.getAll().subscribe((data)=>{
      this.Catalogues = data;
    });
  }

  showCatalogue(){
    this.http.getById(this.selectedCatalogue.Id).subscribe((catalogueInfo) => {
      this.catalogueInfo = catalogueInfo;
      console.log(catalogueInfo);
      err => console.log(err);
    });
  }

  addCatalogue(){
    this.router.navigate(["admin", "addCatalogue"]);
  }
}
