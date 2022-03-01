import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products:any;
constructor(private http:HttpClient){


}

ngOnInit(){
  this.http.get('http://localhost:3000/productlist').subscribe(data=>this.products = data);
}




}
