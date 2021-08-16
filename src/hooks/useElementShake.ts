import { useSpring } from 'react-spring'

const springConfig = {
  mass: 1,
  tension: 1000,
  friction: 15,
}
const from = () => ({
  transform: 1,
})
const to = () => ({
  transform: 0,
})

export const useElementShake = () => {
  const [styles, dispatch] = useSpring(() => ({
    to: async (next) => {
      await next(to())
    },

    config: springConfig,
    from: from(),
    immediate: true,
  }))

  const exec = () => {
    dispatch({
      to: to(),
      config: springConfig,
      from: from(),
      immediate: false,
    })
  }

  return {
    styles: {
      transform: styles.transform
        .to({
          range: [0, 0.5, 1],
          output: [0, 3, 0],
        })
        .to((x) => `rotate(${x}deg)`),
    },
    exec,
  }
}
