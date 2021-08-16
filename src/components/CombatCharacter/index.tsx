import { useEffect, useMemo } from 'react'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import { getImmunities, getStatuses } from '../../types/character/util'
import { min } from '../../types/equation'
import { Bar } from '../_core/Bar'
import { Box } from '../_core/Box'
import { colorMap, ElementalIcon } from '../_core/ElementalIcon'
import { Hexagon } from '../_core/Hexagon'
import { ImmunityCard } from '../_core/ImmunityCard'
import { CombatCharacterStatus } from './CombatCharacterStatus'
import { ReactComponent as Accuracy } from '../../icons/delapouite/eye-target.svg'
import { ReactComponent as Attack } from '../../icons/lorc/battered-axe.svg'
import { ReactComponent as Defense } from '../../icons/sbed/shield.svg'
import { AnimatedNumber } from '../_core/AnimatedNumber'
import { useSpring } from 'react-spring'
import { CombatCharacterStats } from './CombatCharacterStats'
import { CombatCharacterAbility } from './CombatCharacterAbility'
import { CombatCharacterBadges } from './CombatCharacterBadges'
import { convertStatusesToStack } from '../../types/status/util'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { usePrevious } from '../../hooks/usePrevious'
import { useElementShake } from '../../hooks/useElementShake'

export type CombatCharacterProps = {
  character: Character
  side: 'left' | 'right'
  index: number
}

export const CombatCharacter = (props: CombatCharacterProps) => {
  const { character, index } = props
  const { getCharacterStats } = useCombatSystem()
  const stats = useMemo(() => getCharacterStats(character.id), [character])
  const currentHealth = min(stats.health - character.damage, 0)
  const previousHelath = usePrevious(currentHealth) || stats.health
  const currentEnergy = min(stats.energy - character.energyOffset, 0)
  const healthStyles = useSpring({
    value: currentHealth,
  })
  const statusStacks = convertStatusesToStack(getStatuses(character))
  const immunitiesStaks = convertStatusesToStack(getImmunities(character))
  const { styles, exec } = useElementShake()
  useEffect(() => {
    if (currentHealth < previousHelath) {
      exec()
    }
  }, [previousHelath, currentHealth])
  return (
    <Box style={styles}>
      <Box
        width='312px'
        background={theme.boxGradient}
        border='1px solid rgba(255,255,255,0.56)'
        margin={`16px 0 0 48px`}
        flexDirection='row'
      >
        <Box>
          <Hexagon
            color={colorMap[character.elements[0].element]}
            borderColor='rgba(255,255,255,0.56)'
            borderWidth={2}
            size={96}
            style={{
              margin: '27px 0 0 -48px',
            }}
          />
        </Box>
        <Box flex={1}>
          <Box
            color='white'
            alignItems='center'
            flexDirection='row'
            justifyContent='space-between'
            padding='4px 4px 4px 8px'
            borderBottom='1px solid rgba(255,255,255,0.36)'
          >
            <Box
              paddingTop='4px'
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.56)',
                fontFamily: 'Trade Winds',
              }}
            >
              {character.name}
            </Box>
            <Box flexDirection='row'>
              {character.elements.map((element) => (
                <ElementalIcon
                  type={element.element}
                  height='20px'
                  width='20px'
                  marginLeft='4px'
                />
              ))}
            </Box>
          </Box>
          <Box
            flexDirection='row'
            color='white'
            alignItems='center'
            justifyContent='space-around'
            padding='4px'
            background='rgba(0,0,0,0.36)'
            style={{ fontWeight: 700, fontSize: '14px' }}
          >
            <CombatCharacterStats
              icon={<Accuracy />}
              physical={String(stats.physicalAccuracy) + '%'}
              special={String(stats.specialAccuracy) + '%'}
            />
            <CombatCharacterStats
              icon={<Attack />}
              physical={String(stats.physicalAttack).padStart(3, '0')}
              special={String(stats.specialAttack).padStart(3, '0')}
            />
            <CombatCharacterStats
              icon={<Defense />}
              physical={String(stats.physicalDefense).padStart(3, '0')}
              special={String(stats.specialDefense).padStart(3, '0')}
            />
          </Box>
          <Box
            flexDirection='row'
            background='rgba(0,0,0,0.36)'
            padding='0px 4px 4px 4px'
            style={{ fontSize: '14px' }}
          >
            {character.abilities.map((ability, i) => (
              <CombatCharacterAbility
                ability={ability}
                comma={
                  i !== character.abilities.length - 1 &&
                  character.abilities.length > 1
                }
              />
            ))}
          </Box>
          <CombatCharacterBadges character={character} marginLeft='-1px' />
          <Box position='relative'>
            <Bar
              value={currentHealth}
              max={stats.health}
              height='14px'
              background={theme.healthBarRed}
              border='1px solid rgba(0,0,0,0.45)'
              marginLeft='-4px'
              color='rgba(0,0,0,0.56)'
              style={{
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <AnimatedNumber value={healthStyles.value} />/{stats.health}
            </Bar>
            <Bar
              value={currentEnergy}
              max={stats.energy}
              height='12px'
              background={theme.energyBarGreen}
              border='1px solid rgba(0,0,0,0.45)'
              borderTop='none'
              marginLeft='-4px'
              paddingRight='4px'
              color='rgba(0,0,0,0.56)'
              style={{
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {currentEnergy}/{stats.energy}
            </Bar>
          </Box>
        </Box>
      </Box>
      <Box
        justifyContent='space-between'
        color='white'
        flexDirection='row'
        height='28px'
        marginTop='4px'
        marginLeft='72px'
      >
        <Box flexDirection='row'>
          {immunitiesStaks.map((item) => (
            <CombatCharacterStatus
              key={item.status.id}
              item={item}
              color='plum'
            >
              <ImmunityCard status={item.status} />
            </CombatCharacterStatus>
          ))}
        </Box>
        <Box flexDirection='row' justifyContent='flex-end'>
          {statusStacks.map((item) => (
            <CombatCharacterStatus key={item.status.id} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
