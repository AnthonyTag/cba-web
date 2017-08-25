import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-admin-reset',
  templateUrl: './admin-reset.component.html',
  styleUrls: ['./admin-reset.component.css']
})
export class AdminResetComponent implements OnInit {
  form: FormGroup;
  private auth: any;
  resetSent = false;

  constructor(fb: FormBuilder, @Inject(FirebaseApp) firebaseApp: any, private router: Router) {
    this.form = fb.group({
      email: ['', Validators.required]
    });

    this.auth = firebaseApp.auth();
   }

  ngOnInit() {
  }

  resetPassword() {
    console.log("test", this.form.value.email);
    this.auth.sendPasswordResetEmail(this.form.value.email)
        .then(result => {
          this.resetSent = true;
        })
        .catch(error => {
          alert("User not found!");
          this.form.setValue({email: ''});
        });
  }

}
