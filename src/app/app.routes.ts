import { Routes } from '@angular/router';
import { SearchCollectionComponent } from './components/search-collection/search-collection.component';
import { SortedCardsComponent } from './components/sorted-cards/sorted-cards.component';

export const routes: Routes = [
    {path: '', component: SearchCollectionComponent},
    {path: 'sorting', component: SortedCardsComponent}
];
