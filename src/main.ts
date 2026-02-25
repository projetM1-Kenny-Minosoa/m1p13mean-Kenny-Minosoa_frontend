import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './app/app.routes';
import { LoginComponent } from './app/auth/login/login.component';

bootstrapApplication(LoginComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule)
  ]
});