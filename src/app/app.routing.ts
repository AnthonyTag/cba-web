import { Router, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminResetComponent } from './components/admin-reset/admin-reset.component';

import { AuthGuard } from './services/auth-guard.service';

export const routing = RouterModule.forRoot([
    { path: "", component: HomeComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/reset', component: AdminResetComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
]);