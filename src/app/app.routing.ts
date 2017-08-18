import { Router, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

export const routing = RouterModule.forRoot([
    {path: "/", component: HomeComponent }
]);