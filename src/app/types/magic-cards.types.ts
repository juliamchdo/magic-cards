export interface MagicCards {
    block: string,
    booster: [],
    code: string,
    name: string,
    onlineOnly: boolean,
    releaseDate: Date,
    type: string
}

export interface MagicCardsList {
    sets: MagicCards[]
}