import { makeStatusFn } from '../util'

export const Burned = makeStatusFn({
  name: 'Burned',
  isStackable: false,
  modifiers: [
    {
      stats: {
        physicalAttack: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
})
