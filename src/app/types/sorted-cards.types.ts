export interface SortedCards {
    colorIdentity: string,
    imageUrl: string
    manaCost: string[],
    name: string,
    text: string,
    type: string,
}

export interface SortedCardsList{
    cards: SortedCards[]
}