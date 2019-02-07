import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  private createForm(): void{
    this.loginForm = this.fb.group({
      user: ['',[Validators.required, Validators.minLength(3)]],
      surname: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    // valida la informacion introducida
    const {email, password} = this.loginForm.value;
    console.log(`Email: ${email}, Password: ${password}`);
  }
 

}
