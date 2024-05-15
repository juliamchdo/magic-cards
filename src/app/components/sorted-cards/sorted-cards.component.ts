import { Component, OnInit } from '@angular/core';
import { MagicCardsService } from '../../services/magic-cards.service';
import { SortedCards } from '../../types/sorted-cards.types';
import { StatesServices } from '../../services/states.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sorted-cards',
  standalone: true,
  imports: [],
  templateUrl: './sorted-cards.component.html',
  styleUrl: './sorted-cards.component.scss'
})
export class SortedCardsComponent implements OnInit{
  
  constructor(private magicCardsService: MagicCardsService, private statesServices: StatesServices, private router: Router) {}

  sortedCards: SortedCards[]= [];
  isLoading = true
  code!: string;

  ngOnInit(){
    this.statesServices.getParams().subscribe((param) => {
      this.code = param;
    });

    if(!this.code) this.router.navigate(['']);
    this.sortCards(this.code);
  }

  async sortCards(code: string) {
    while (this.sortedCards.length < 30) {
      const sortedCards = await this.magicCardsService.sortCards(code);
      sortedCards.cards.forEach((card) => {
        if (card.type.includes('Creature') && this.sortedCards.length < 30) this.sortedCards.push(card);
      });
      if (this.sortedCards.length >= 30)  break; 
    }
    this.isLoading = false
  }

  backToSearch(){
    this.router.navigate(['']);
  }
}
