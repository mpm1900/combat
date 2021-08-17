export type CharacterEventType =
  | 'onActiveTurnStart'
  | 'onActiveTurnEnd'
  | 'onBecomeActive'

export type CharacterEvent = {
  type: CharacterEventType
}
