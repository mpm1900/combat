import { CharacterStats } from '../../../types/character/character'
import { Status } from '../../../types/status/status'
import { Box } from '../Box'
import { TooltipCard } from '../TooltipCard'
import { statusDescriptions } from './descriptions'

export const statKeyMap: Record<keyof CharacterStats, string> = {
  health: 'Health',
  speed: 'Speed',
  energy: 'Energy',
  initiative: 'Initiative',
  evasion: 'Evasion',
  physicalArmor: 'Physical Armor',
  specialArmor: 'Special Armor',
  criticalChance: 'Critical Chance',
  criticalDamage: 'Critical Damage',
  turnHealthRegen: 'Health Regen (each turn)',
  activeTurnHealthRegen: 'Health Regen (on turn)',
  queuePositionOffset: 'Queue Position',
  forceCombatCheckSuccess: 'Forced Check Success',
  forceCombatCheckFailure: 'Forced Check Failure',
  memory: 'Memory',
  equip: 'Equipable Item(s)',
  physicalAccuracy: 'Physical Accuracy',
  physicalAttack: 'Physical Attack',
  physicalDefense: 'Physical Defense',
  specialAccuracy: 'Special Accuracy',
  specialAttack: 'Special Attack',
  specialDefense: 'Special Defense',
  normalAccuracy: 'Normal Accuracy',
  normalDamage: 'Normal Damage',
  normalResistance: 'Normal Resistance',
  fireAccuracy: 'Fire Accuracy',
  fireDamage: 'Fire Damage',
  fireResistance: 'Fire Resistance',
  waterAccuracy: 'Water Accuracy',
  waterDamage: 'Water Damage',
  waterResistance: 'Water Resistance',
  grassAccuracy: 'Grass Accuracy',
  grassDamage: 'Grass Damage',
  grassResistance: 'Grass Resistance',
  earthAccuracy: 'Earth Accuracy',
  earthDamage: 'Earth Damage',
  earthResistance: 'Earth Resistance',
  thunderAccuracy: 'Thunder Accuracy',
  thunderDamage: 'Thunder Damage',
  thunderResistance: 'Thunder Resistance',
  airAccuracy: 'Air Accuracy',
  airDamage: 'Air Damage',
  airResistance: 'Air Resistance',
  ghostAccuracy: 'Ghost Accuracy',
  ghostDamage: 'Ghost Damage',
  ghostResistance: 'Ghost Resistance',
  darkAccuracy: 'Dark Accuracy',
  darkDamage: 'Dark Damage',
  darkResistance: 'Dark Resistance',
  lightAccuracy: 'Light Accuracy',
  lightDamage: 'Light Damage',
  lightResistance: 'Light Resistance',
}

export type StatusCardProps = {
  status: Status
}

export const StatusCard = (props: StatusCardProps) => {
  const { status } = props
  const modKeys = status.modifiers.map((mod) =>
    Object.keys(mod.stats),
  ) as (keyof CharacterStats)[][]
  const description = statusDescriptions[status.statusId]
  return (
    <TooltipCard>
      <Box style={{ fontWeight: 700 }}>{status.name}</Box>

      <Box
        color='rgba(255,255,255,0.63)'
        marginBottom='4px'
        style={{ fontWeight: 400, fontSize: '10px' }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          Duration:{' '}
          {status.duration <= -1 ? <span>&#8734;</span> : status.duration} Turn
          {status.duration !== 1 ? 's' : ''}
        </span>
      </Box>
      {description && <Box style={{ fontSize: '14px' }}>{description}</Box>}
      {!description && (
        <Box style={{ fontSize: '14px' }}>
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
      )}
      {(status.removeOnHit ||
        status.removeOnActiveTurnStart ||
        status.removeOnActiveTurnEnd) && (
        <Box marginTop='8px' style={{ fontWeight: 600 }}>
          {status.removeOnHit && (
            <Box style={{ fontSize: '10px' }}>Removed on hit.</Box>
          )}
          {status.removeOnActiveTurnStart && (
            <Box style={{ fontSize: '10px' }}>
              Removed at start of character's next turn.
            </Box>
          )}
          {status.removeOnActiveTurnEnd && (
            <Box style={{ fontSize: '10px' }}>
              Removed at end of character's next turn.
            </Box>
          )}
        </Box>
      )}
    </TooltipCard>
  )
}
