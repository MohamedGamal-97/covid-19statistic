import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { InfoComponent } from './components/info/info.component';


const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'countries',component:CountriesComponent},
  {path:'Info',component:InfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
