import { Component, Input } from '@angular/core';
import { MagicCards } from '../../types/magic-cards.types';
import { CommonModule } from '@angular/common';
import { MagicCardsService } from '../../services/magic-cards.service';
import { SortedCards } from '../../types/sorted-cards.types';
import { Router } from '@angular/router';
import { StatesServices } from '../../services/states.service';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss',
})
export class CollectionListComponent {
  @Input() magicCards: MagicCards[] = [];

  constructor(private router: Router, private statesService: StatesServices) {}

  selectedCards: SortedCards[] = [];
  isLoading = false

  sortCards(code: string){
    this.statesService.setParams(code);
    this.router.navigate(['/sorting']);
  }

}
