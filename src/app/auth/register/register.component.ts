import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FooterComponent
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['client'] 
    });
  }

  submit() {
  if (this.registerForm.valid) {
    const formValue = this.registerForm.value;

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => u.name === formValue.name || u.email === formValue.email)) {
      this.error = 'Nom ou email déjà utilisé';
      return;
    }

    const newUser: User = {
      id: Date.now(), 
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.router.navigate([`/${newUser.role}`]);
  }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}