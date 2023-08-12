import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpHandlerInterceptor } from './interceptors/http-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    SidebarComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpHandlerInterceptor, multi:true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
