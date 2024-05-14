import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MagicCardsList } from "../types/magic-cards.types";
import { firstValueFrom } from "rxjs";
import { promises } from "dns";
import { SortedCardsList } from "../types/sorted-cards.types";

@Injectable({
    providedIn: 'root',
})

export class MagicCardsService {
    baseURL = 'https://api.magicthegathering.io/v1/';

    constructor(private http: HttpClient) { }

    async listCards(urlName: string, block: string): Promise<MagicCardsList> {
        let url = `${this.baseURL}sets?block=${block}`;
        if (urlName) url += `&name=${urlName}`;
        try {
            const magicCardsList: any = await firstValueFrom(this.http.get(url));
            return magicCardsList;
        } catch (error) {
            throw error;
        }
    }

    async sortCards(code: string): Promise<SortedCardsList> {
        const url = `${this.baseURL}sets/${code}/booster`;
        try {
            const sortedCards:any = await firstValueFrom(this.http.get(url));
            return sortedCards;
        } catch (error) {
            throw error;
        }
    }
}