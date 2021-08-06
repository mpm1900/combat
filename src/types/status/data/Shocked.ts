import { makeStatusFn } from '../util'

export const Shocked = makeStatusFn({
  name: 'Shocked',
  isStackable: false,
  modifiers: [
    {
      stats: {
        speed: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
})
