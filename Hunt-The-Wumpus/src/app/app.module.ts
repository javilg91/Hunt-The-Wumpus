import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampoDeBatallaComponent } from './components/campo-de-batalla/campo-de-batalla.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [AppComponent, CampoDeBatallaComponent, SettingsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
