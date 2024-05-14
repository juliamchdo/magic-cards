import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchCollection } from '../../types/sarch-collection.types';
import { MagicCardsService } from '../../services/magic-cards.service';
import { MagicCards } from '../../types/magic-cards.types';
import { CollectionListComponent } from "../collection-list/collection-list.component";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-search-collection',
    standalone: true,
    templateUrl: './search-collection.component.html',
    styleUrl: './search-collection.component.scss',
    imports: [ReactiveFormsModule, CollectionListComponent]
})
export class SearchCollectionComponent {

  public formSearch: FormGroup;

  constructor(private fb: FormBuilder, private magicCardsService: MagicCardsService, private toastr: ToastrService) {
    this.formSearch = this.buildFormSerach();
  }

  isLoading = false;
  cards: MagicCards[] = [];
  blockList: SearchCollection[] = [
    { id: '', name: 'Selecione um bloco' },
    { id: 'Amonkhet', name: 'Amonkhet' },
    { id: 'Ixalan', name: 'Ixalan' },
    { id: 'Zendikar', name: 'Zendikar' },
    { id: 'Ravnica', name: 'Ravnica' },
    { id: 'Onslaught', name: 'Onslaught' }
  ];

  private buildFormSerach(): FormGroup {
    return this.fb.group({
      name: [null, []],
      blockType: ['', Validators.required]
    });
  }

  async searchCards(){
    this.cards = [];
    if(this.invalidForm()){
      document.getElementById('select-input')?.classList.add('is-invalid');
      this.toastr.error('Campo "Bloco" é obrigatório',  'Ops..')
      throw new Error('Preencha todos os campos');
    }
    document.getElementById('select-input')?.classList.remove('is-invalid');
    this.isLoading = true
    let cardName = this.formSearch.get('name')?.value;
    if(cardName) cardName = cardName.replace(' ', '|');
    const cardBlock = this.formSearch.get('blockType')?.value;
    await this.magicCardsService.listCards(cardName, cardBlock).then((res) => {
      this.cards.push(...res.sets)
      this.isLoading = false
    });
  }

  invalidForm(){
    return this.formSearch.get('blockType')?.invalid || !this.formSearch.get('blockType')?.value
  }

}
