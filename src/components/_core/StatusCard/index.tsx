import { CharacterStats } from '../../../types/character/character'
import { Status } from '../../../types/status/status'
import { Box } from '../Box'

export const statKeyMap: Record<keyof CharacterStats, string> = {
  health: 'Health',
  speed: 'Speed',
  energy: 'Energy',
  initiative: 'Initiative',
  evasion: 'Evasion',
  criticalChance: 'Critical Chance',
  criticalDamage: 'Critical Damage',
  turnHealthRegen: 'Health Regen (each turn)',
  activeTurnHealthRegen: 'Health Regen (on turn)',
  queuePositionOffset: 'Queue Position',
  physicalAccuracy: 'Phys. Accuracy',
  physicalAttack: 'Phys Attack',
  physicalDefense: 'Phys Defense',
  specialAccuracy: 'Spec Accuracy',
  specialAttack: 'Spec Attack',
  specialDefense: 'Spec Defense',
  fireDamage: 'Fire Damage',
  fireResistance: 'Fire Res',
  waterDamage: 'Water Damage',
  waterResistance: 'Water Res',
  grassDamage: 'Grass Damage',
  grassResistance: 'Grass Res',
  earthDamage: 'Earth Damage',
  earthResistance: 'Earth Res',
  thunderDamage: 'Thunder Damage',
  thunderResistance: 'Thunder Res',
  airDamage: 'Air Damage',
  airResistance: 'Air Res',
  ghostDamage: 'Ghost Damage',
  ghostResistance: 'Ghost Res',
  darkDamage: 'Dark Damage',
  darkResistance: 'Dark Res',
  lightDamage: 'Light Damage',
  lightResistance: 'Light Res',
}

export type StatusCardProps = {
  status: Status
}

export const StatusCard = (props: StatusCardProps) => {
  const { status } = props
  const modKeys = status.modifiers.map((mod) =>
    Object.keys(mod.stats),
  ) as (keyof CharacterStats)[][]
  return (
    <Box background='white' padding='8px'>
      <Box style={{ fontWeight: 700 }}>{status.name}</Box>
      <Box
        color='rgba(0,0,0,0.63)'
        style={{ fontWeight: 900, fontSize: '10px' }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          Duration:{' '}
          {status.duration === -1 ? <span>&#8734;</span> : status.duration} Turn
          {status.duration !== 1 ? 's' : ''}
        </span>
      </Box>
      <Box>
        {modKeys.map((keys, modIndex) =>
          keys.map((key) => {
            const mod = status.modifiers[modIndex]
            const eq = mod.stats[key]
            if (!eq) return null
            return (
              <Box key={`${status.id}-${key}`}>
                {eq.m !== 0 && (
                  <Box>
                    {statKeyMap[key]}: {eq.m > 0 ? '+' : ''}
                    {eq.m * 100}%
                  </Box>
                )}
                {eq.b !== 0 && (
                  <Box>
                    {statKeyMap[key]}: {eq.b > 0 ? '+' : ''}
                    {eq.b}
                  </Box>
                )}
              </Box>
            )
          }),
        )}
      </Box>
    </Box>
  )
}
