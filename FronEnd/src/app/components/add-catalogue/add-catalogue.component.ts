import { Component, OnInit } from '@angular/core';
import { GetValidCatagoues, PostValidCatagoues } from 'src/app/services/catalogue/catalogue.history.service';
import { CatalogueHistory } from 'src/app/models/CatalogueHistory';
import { Catalogue } from 'src/app/models/Catalogue';
import { PostCatalogueHttpService } from 'src/app/services/catalogue/catalogue.service';
import { CatalogueBindingModel } from 'src/app/models/CatalogueBindingModel';

@Component({
  selector: 'app-add-catalogue',
  templateUrl: './add-catalogue.component.html',
  styleUrls: ['./add-catalogue.component.css']
})
export class AddCatalogueComponent implements OnInit {
  validFrom: Date = null;
  catalogueHistories: CatalogueHistory[];
  catalogue: Catalogue = new Catalogue();
  catalogueInformation: CatalogueBindingModel = new CatalogueBindingModel();
  message: string;
  
  constructor(private httpValidCatalogues: GetValidCatagoues, private httpCatalogue: PostCatalogueHttpService) { }

  ngOnInit() {
    this.httpValidCatalogues.getAll().subscribe((data)=>{
      this.catalogueHistories = data;
    });
  }

  addCatalogue(catalogueHistories){
    this.catalogue.ValidFrom = this.validFrom;
    this.catalogueInformation.Catalogue = this.catalogue;
    this.catalogueInformation.CatalogueHistories = this.catalogueHistories;
    console.log(this.catalogueInformation);
    this.httpCatalogue.post(this.catalogueInformation).subscribe((data)=>{
      if(data){
        this.message = "Uspesno je dodat novi cenovnik";
      }
      else{
        this.message = "Neuspesno dodat cenovnik";
      }
    });
  }
}
