import { makeStatusFn } from '../util'

export const Warped = makeStatusFn({
  name: 'Warped',
  isStackable: false,
  modifiers: [
    {
      stats: {
        queuePositionOffset: {
          m: 0,
          b: 100,
        },
      },
    },
  ],
})
