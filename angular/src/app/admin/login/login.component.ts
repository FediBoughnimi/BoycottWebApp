import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLogin: boolean = false;
  showText: boolean = false;
  showLogo: boolean = false;
  showForm: boolean = false;

  authForm: FormGroup;
  errors = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  existingUsers = [
    { username: 'user1', email: 'test@example.com', password: 'Test@1234' },
    { username: 'user2', email: 'sample@example.com', password: 'Sample@1234' }
  ];

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: ['', !this.isLogin ? Validators.required : null],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.showText = true, 500);
    setTimeout(() => this.showLogo = true, 1500);
    setTimeout(() => this.showForm = true, 2500);
  }

  isExistingUser(username: string): boolean {
    return this.existingUsers.some(user => user.username === username);
  }

  isExistingEmail(email: string): boolean {
    return this.existingUsers.some(user => user.email === email);
  }

  validateForm() {
    const { username, email, password, confirmPassword } = this.authForm.value;

    this.errors.username = this.isLogin ? '' : this.isExistingUser(username) ? 'Username is already taken' : '';
    this.errors.email = !this.isLogin && this.isExistingEmail(email) ? 'Email is already registered' : '';
    this.errors.password = password !== confirmPassword && !this.isLogin ? 'Passwords do not match' : '';

    if (!this.isLogin) {
      if (password.length < 7) this.errors.password = 'Password must be at least 7 characters long';
      if (!/[A-Z]/.test(password)) this.errors.password = 'Password must include at least one uppercase letter';
      if (!/\d/.test(password)) this.errors.password = 'Password must include at least one digit';
      if (!/[@$!%*?&]/.test(password)) this.errors.password = 'Password must include at least one special character';
    }
  }

  handleSubmit() {
    this.validateForm();
    if (this.isLogin) {
      // Logic for login
      console.log('Login successful');
    } else {
      // Logic for sign-up
      console.log('Sign-up successful');
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.authForm.reset();
    this.validateForm();
  }

}
