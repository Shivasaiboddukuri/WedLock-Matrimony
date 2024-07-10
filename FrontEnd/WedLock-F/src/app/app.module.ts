import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchesComponent } from './matches/matches.component';
import { HomeComponent } from './home/home.component';
import { AgePipe } from './age.pipe';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { LandingComponent } from './landing/landing.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { UnregisterDialogComponent } from './unregister-dialog/unregister-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HeaderComponent,
        LogoutComponent,
        AboutComponent,
        MatchesComponent,
        HomeComponent,
        AgePipe,
        ProfileComponent,
        SearchComponent,
        ForgetPassComponent,
        ResetPassComponent,
        LandingComponent,
        UnregisterDialogComponent,
        // FooterComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        NgxCaptchaModule,
        MatFormFieldModule,
        CarouselModule.forRoot(),
        FooterComponent
    ]
})
export class AppModule { }
