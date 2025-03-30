import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './custom-components/login/login.component';
import { RegisterComponent } from './custom-components/register/register.component';
import { HomeComponent } from './custom-components/home/home.component';
import { ProfileComponent } from './custom-components/profile/profile.component';
import { QuizComponent } from './custom-components/quiz/quiz.component';
import { AboutUsComponent } from './custom-components/about-us/about-us.component';
import { ServicesComponent } from './custom-components/services/services.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'quiz', component: QuizComponent},
  { path: 'about-us', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
