import { makeStatusFn } from '../util'

export const Wet = makeStatusFn({
  name: 'Wet',
  isStackable: false,
  modifiers: [
    {
      stats: {
        specialDefense: {
          m: -0.5,
          b: 0,
        },
      },
    },
  ],
})
