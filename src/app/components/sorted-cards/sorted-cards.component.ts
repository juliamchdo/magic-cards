import { Component, OnInit } from '@angular/core';
import { MagicCardsService } from '../../services/magic-cards.service';
import { SortedCards } from '../../types/sorted-cards.types';
import { StatesServices } from '../../services/states.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sorted-cards',
  standalone: true,
  imports: [],
  templateUrl: './sorted-cards.component.html',
  styleUrl: './sorted-cards.component.scss',
})
export class SortedCardsComponent implements OnInit {
  constructor(
    private magicCardsService: MagicCardsService,
    private statesServices: StatesServices,
    private router: Router,
    private toatsr: ToastrService
  ) {}

  sortedCards: SortedCards[] = [];
  isLoading = true;
  code!: string;

  ngOnInit() {
    this.statesServices.getParams().subscribe((param) => {
      this.code = param;
      this.code ? this.sortCards(this.code) : this.router.navigate(['']);
    });
  }

  async sortCards(code: string) {
    let error = false;

    while (this.sortedCards.length < 30 && !error) {
      try {
        const res = await this.magicCardsService.sortCards(code);
        res.cards.forEach((card) => {
          if (card.type.includes('Creature') && this.sortedCards.length < 30) {
            this.sortedCards.push(card);
          }
        });
      } catch (err) {
        this.toatsr.error(
          'Erro ao carregar booster, tente novamente mais tarde.',
          'Ops..'
        );
        this.isLoading = false;
        error = true;
      }

      if (this.sortedCards.length >= 30 || error) break;
    }
    this.isLoading = false;
  }

  hasColorIdentity(color: string): boolean{
    const colorIdentity = ['U', 'G', 'B', 'R']
    return colorIdentity.includes(color)
  }

  showColorIdentity(colorIdentity: string){
    let imagePath = '../../../assets/images/';
    const colorTypes: {[key: string]: string} = {
      'U': 'U.png',
      'B': 'B.png',
      'R': 'R.png',
      'G': 'G.png'
    }
    return imagePath += colorTypes[colorIdentity];
  }

  backToSearch() {
    this.router.navigate(['']);
  }
}
