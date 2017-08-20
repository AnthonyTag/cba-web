import { Component, OnInit } from '@angular/core';
import { PriceObject, ItemObject, MenuObject } from '../../services/containerObjects';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tempMenus = [];
  tempItems = [];

  constructor(private firebase: FirebaseService) { }


  ngOnInit() {
    //Testing database; Remove later;
    //Testing Login
    //this.firebase.signIn({username: 'timothypaulcunningham@gmail.com', password: 'password'});

    //Getting All Menus
    this.firebase.getMenus()
    .subscribe(result => {
      console.log("MENUS", result);
      this.tempMenus = result;
    });

    //Getting All Items
    this.firebase.getItems()
    .subscribe(result => {
      console.log("ITEMS", result);
      this.tempItems = result;
    });
  }

  addTestItem() {
    let price = new PriceObject();
    let item = new ItemObject();

    price.description = "Sample Price Description";
    price.amount = "Sample Price Amount";

    item.title = "Sample Item Title";
    item.description = "Sample Item Description";
    item.extras = [price, price, price];
    item.price = [price];
    item.tags = ["V", "GF"];

    this.firebase.addItem(item);
  }

  removeTestItem() {
    if(this.tempItems.length > 0) {
      this.firebase.removeItem(this.tempItems[0].$key);
    }
  }

  addTestMenu() {
    let menu = new MenuObject();
    
    menu.title = "Sample Menu Title";
    menu.description = "Sample Menu Description";
    menu.items = this.tempItems;

    console.log(this.tempItems);

    this.firebase.addMenu(menu);
  }

  removeTestMenu() {
    if(this.tempMenus.length > 0) {
      this.firebase.removeMenu(this.tempMenus[0].$key);
    }
  }

  updateItem() {
    if(this.tempItems.length > 0) {
      let item = this.tempItems[0];
      item.title = "New Item Title";
      this.firebase.updateItem(item.$key, item);
    }
  }

  updateMenu() {
    if(this.tempMenus.length > 0) {
      let menu = this.tempMenus[0];
      menu.title = "New Menu Title";
      this.firebase.updateMenu(menu.$key, menu);
    }
  }

  logout() {
    this.firebase.signOut();
  }

}
