import { provideHttpClient } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '@environments/environment'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { NavbarComponent } from '@shared/pages/components/navbar/navbar.component'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), NavbarComponent],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent],
})
export class AppModule {}
