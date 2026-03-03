import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FooterComponent
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find(u =>
        u.name === this.loginForm.value.name &&
        u.password === this.loginForm.value.password
      );

      if (!user) {
        this.error = 'Nom ou mot de passe incorrect';
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(user));

      if (user.name === 'admin' && user.password === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate([`/${user.role}`]);
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}