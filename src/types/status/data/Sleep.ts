import { makeStatusFn } from '../util'

export const Sleep = makeStatusFn({
  name: 'Sleep',
  isStackable: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -1,
          b: 0,
        },
        activeTurnHealthRegen: {
          m: 0,
          b: 9999,
        },
      },
    },
  ],
})
