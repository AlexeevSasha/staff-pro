export interface IDrafts {
    title: string,
    body: string,
    id: number
}

export type DraftForm = Omit<IDrafts, 'id'>