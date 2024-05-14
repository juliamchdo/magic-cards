import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchCollection } from '../../types/sarch-collection.types';
import { MagicCardsService } from '../../services/magic-cards.service';
import { MagicCards } from '../../types/magic-cards.types';

@Component({
  selector: 'app-search-collection',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-collection.component.html',
  styleUrl: './search-collection.component.scss'
})
export class SearchCollectionComponent {

  public formSearch: FormGroup;

  constructor(private fb: FormBuilder, private magicCardsService: MagicCardsService) {
    this.formSearch = this.buildFormSerach();
  }

  cards: MagicCards[] = [];
  blockList: SearchCollection[] = [
    { id: 'Amonkhet', name: 'Amonkhet' },
    { id: 'Ixalan', name: 'Ixalan' },
    { id: 'Zendikar', name: 'Zendikar' },
    { id: 'Ravnica', name: 'Ravnica' },
    { id: 'Onslaught', name: 'Onslaught' }
  ];

  private buildFormSerach(): FormGroup {
    return this.fb.group({
      name: [null, []],
      blockType: [null, Validators.required]
    });
  }

  async searchCards(){
    if(this.formSearch.get('blockType')?.invalid) throw new Error('Preencha todos os campos');
    
    const cardName = this.formSearch.get('name')?.value;
    const cardBlock = this.formSearch.get('blockType')?.value;
    await this.magicCardsService.listCards(cardName, cardBlock).then((res) => this.cards.push(...res.sets));
  }

}
