import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './custom-components/home/home.component';
import { NavbarComponent } from './custom-components/navbar/navbar.component';
import { TypewriterComponent } from './custom-components/typewriter/typewriter.component';
import { RegisterComponent } from './custom-components/register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './custom-components/login/login.component';
import { CardComponent } from './custom-components/card/card.component';
import { FilterComponent } from './custom-components/filter/filter.component';
import { SearchbarComponent } from './custom-components/searchbar/searchbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './custom-components/profile/profile.component';
import { QuizComponent } from './custom-components/quiz/quiz.component';
import { McqComponent } from './custom-components/mcq/mcq.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TypewriterComponent,
    RegisterComponent,
    LoginComponent,
    CardComponent,
    FilterComponent,
    SearchbarComponent,
    ProfileComponent,
    QuizComponent,
    McqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
