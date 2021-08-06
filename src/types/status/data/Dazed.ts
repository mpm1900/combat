import { makeStatusFn } from '../util'

export const Dazed = makeStatusFn({
  name: 'Dazed',
  isStackable: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -1,
          b: 0,
        },
      },
    },
  ],
})
