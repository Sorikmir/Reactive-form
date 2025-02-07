import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatLabel, MatFormField, MatInput, MatButton ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 form: FormGroup | undefined; 
constructor(public http: HttpClient){}

 ngOnInit(){
  this.form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.minLength(6)]),
  })
  this.form.valueChanges.subscribe(
    value => console.log(value)
  )
 }
 submit(){
  if(this.form?.valid){
    console.log('Sent', this.form);
    this.sendData(this.form?.value)
  } else{
    console.log('Error', this.form)
    }
  }
 sendData(user: any){
this.http.post('http//localhost:8080', user);
this.form?.reset();
 }

}
