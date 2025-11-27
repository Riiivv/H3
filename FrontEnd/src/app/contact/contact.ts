import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],       // e-mail eller mobil
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    // Her ville du normalt kalde dit API
    console.log('Login payload:', this.loginForm.value);
    alert('(Dummy) Login sendt – her ville vi slå billetter op i backenden.');
  }
}
