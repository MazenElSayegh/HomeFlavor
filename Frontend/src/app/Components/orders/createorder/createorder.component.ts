import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { OrdersService } from 'src/app/Services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent {
  constructor(private myService:OrdersService,private router:Router){  }
  validationForm=new FormGroup({
    name:new FormControl(null,[Validators.minLength(3)]),
    age:new FormControl(null,[Validators.min(20),Validators.max(40)]),
    email:new FormControl(null,Validators.required),
  })
  get NameValid(){
    return this.validationForm.controls["name"].valid;
  }
  get AgeValid(){
    return this.validationForm.controls["age"].valid;
  }


  Add(name:any,age:any, email:any, phone:any){
    let newStudent = {name, age, email, phone};
    //this.myService.AddNewOrder(newStudent).subscribe();
    alert("added successfully");
    this.router.navigateByUrl('/students');
  }

}
