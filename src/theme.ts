const tokens = {
  statsGreen: '#a3ffa3',
  statsPink: '#ffa3a3',
  healthBarRed: 'rgba(200, 100, 100, 1)',
  energyBarGreen: 'rgba(120, 150, 120, 1)',
  perfectCheckColor: '#fcba03',

  physicalColor: 'rgba(215,93,13,1)',
  physicalTextColor: 'rgba(248, 180, 135, 1)',
  specialColor: 'rgba(130,93,232,1)',
  specialTextColor: 'rgba(169, 143, 239, 1)',

  boxGradientFrom: 'rgba(27,36,45,1)',
  boxGradientTo: 'rgba(54,63,81,1)',

  white: 'rgba(255,255,255,1)',
  white0: 'rgba(255,255,255,0)',
  white1: 'rgba(255,255,255,0.09)',
  white2: 'rgba(255,255,255,0.18)',
  white3: 'rgba(255,255,255,0.27)',
  white4: 'rgba(255,255,255,0.36)',
  white5: 'rgba(255,255,255,0.45)',
  white6: 'rgba(255,255,255,0.54)',
  white7: 'rgba(255,255,255,0.63)',
  white8: 'rgba(255,255,255,0.72)',
  white9: 'rgba(255,255,255,0.81)',
  white10: 'rgba(255,255,255,0.9)',

  space: '16px',
  space0: '0px',
  space1: '2px',
  space2: '4px',
  space3: '8px',
  space4: '12px',
  space5: '16px',
  space6: '24px',
}

export const theme = {
  ...tokens,
  boxGradient: `linear-gradient(
    198deg,
    ${tokens.boxGradientFrom} 0%,
    ${tokens.boxGradientTo} 100%
  )`,
}
