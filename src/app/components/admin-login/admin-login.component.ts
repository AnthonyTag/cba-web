import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;
  hasError = false;

  constructor(fb: FormBuilder, private firebase: FirebaseService, private router: Router) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  ngOnInit() {
  }

  login() {
    this.firebase.signIn(this.form.value, this.loginCallback, this);
  }

  loginCallback(result, reference) {
    if(result.value) {
      reference.router.navigate(['admin']);
      reference.hasError = false;
    } else {
      reference.hasError = true;
      reference.form.setValue({username: reference.form.value.username, password: ''});
    }
  }

}
