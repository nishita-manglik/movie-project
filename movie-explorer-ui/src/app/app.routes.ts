import { Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';

export const routes: Routes = [
    // {path:"layout", component: LayoutComponent},
    {path:"movie", component: MovieComponent},
    {path:"movie/movie-detail", component: MovieDetailsComponent},
    // {
    //     path: "layout",
    //     loadChildren: () => import(`./layout/layout.module`).then(
    //     module => module.LayoutModule
    //     )
    // },
    {path:"", redirectTo:"/movie", pathMatch:"full"},
];
