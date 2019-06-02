import { Component, OnInit } from '@angular/core';
import { CatalogueHttpService } from 'src/app/services/catalogue/catalogue.service';
import { CatalogueInfo } from 'src/app/models/CatalogueInfo';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  catalogueInfo:CatalogueInfo

  constructor(private http: CatalogueHttpService) { }

  ngOnInit() {
    this.http.getAll().subscribe((catalogueInfo) => {
      this.catalogueInfo = catalogueInfo;
      console.log(catalogueInfo);
      err => console.log(err);
    });
  }

}
