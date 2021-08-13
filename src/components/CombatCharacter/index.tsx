import { useMemo } from 'react'
import { useCombat } from '../../contexts/CombatContext'
import { theme } from '../../theme'
import { Character } from '../../types/character/character'
import {
  getImmunities,
  getStats,
  getStatuses,
} from '../../types/character/util'
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

export type CombatCharacterProps = {
  character: Character
  side: 'left' | 'right'
}

export const CombatCharacter = (props: CombatCharacterProps) => {
  const { character, side } = props
  const { getActiveCharacter } = useCombat()
  const activeCharacter = getActiveCharacter()
  const isActive = character.id === activeCharacter?.id
  const stats = useMemo(() => getStats(character), [character])
  const currentHealth = min(stats.health - character.damage, 0)
  const currentEnergy = min(stats.energy - character.energyOffset, 0)
  const healthStyles = useSpring({
    value: currentHealth,
  })
  return (
    <Box
      style={
        {
          //transform: isActive ? 'scale(1.2)' : '',
          //marginLeft: isActive ? '-24px' : '',
        }
      }
    >
      <Box
        width='312px'
        background={theme.boxGradient}
        border='1px solid rgba(255,255,255,0.56)'
        margin='36px 0 0 48px'
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
          <Box>
            <Box
              color='white'
              alignItems='center'
              flexDirection='row'
              padding='4px 4px 4px 8px'
              borderBottom='1px solid rgba(255,255,255,0.36)'
            >
              {character.elements.map((element) => (
                <ElementalIcon
                  type={element.element}
                  height='20px'
                  width='20px'
                />
              ))}
              <Box
                marginLeft='6px'
                paddingTop='4px'
                style={{
                  textShadow: '0 1px 3px rgba(0,0,0,0.56)',
                  fontFamily: 'Trade Winds',
                }}
              >
                {character.name}
              </Box>
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
            {character.abilities.map((ability) => (
              <CombatCharacterAbility ability={ability} />
            ))}
          </Box>
          <Box position='relative'>
            <Box
              position='absolute'
              height='56px'
              width='56px'
              zIndex={2}
              top='-14px'
              left='-38px'
              paddingTop='2px'
              alignItems='center'
              justifyContent='center'
              style={{
                fontFamily: 'Trade Winds',
                fontSize: '12px',
              }}
            >
              <Hexagon
                size={32}
                color='rgba(37, 39, 60, 1)'
                borderWidth={2}
                borderColor='rgba(255,255,255,0.54)'
                style={{
                  transform: 'rotate(30deg)',
                }}
              />
              <Box
                position='absolute'
                zIndex={2}
                marginTop='4px'
                color='darkseagreen'
              >
                {character.level}
              </Box>
            </Box>
            <Box
              position='absolute'
              height='56px'
              width='56px'
              zIndex={2}
              top='1px'
              left='-64px'
              paddingTop='2px'
              alignItems='center'
              justifyContent='center'
              style={{
                fontFamily: 'Trade Winds',
                fontSize: '12px',
              }}
            >
              <Hexagon
                size={32}
                color='rgba(37, 39, 60, 1)'
                borderWidth={2}
                borderColor='rgba(255,255,255,0.54)'
                style={{
                  transform: 'rotate(30deg)',
                }}
              />
              <Box
                position='absolute'
                zIndex={2}
                marginTop='4px'
                color='lightblue'
              >
                {stats.speed}
              </Box>
            </Box>
            <Box
              position='absolute'
              height='56px'
              width='56px'
              zIndex={2}
              top='-14px'
              left='-90px'
              paddingTop='2px'
              alignItems='center'
              justifyContent='center'
              style={{
                fontFamily: 'Trade Winds',
                fontSize: '12px',
              }}
            >
              <Hexagon
                size={32}
                color='rgba(37, 39, 60, 1)'
                borderWidth={2}
                borderColor='rgba(255,255,255,0.54)'
                style={{
                  transform: 'rotate(30deg)',
                }}
              />
              <Box
                position='absolute'
                zIndex={2}
                marginTop='4px'
                color='lightgreen'
              >
                {stats.evasion}%
              </Box>
            </Box>
            {stats.physicalArmor > 0 && (
              <Box
                position='absolute'
                height='56px'
                width='56px'
                zIndex={2}
                top='-29px'
                left='-116px'
                paddingTop='2px'
                alignItems='center'
                justifyContent='center'
                style={{
                  fontFamily: 'Trade Winds',
                  fontSize: '12px',
                }}
              >
                <Hexagon
                  size={32}
                  color='rgba(37, 39, 60, 1)'
                  borderWidth={2}
                  borderColor='rgba(255,255,255,0.54)'
                  style={{
                    transform: 'rotate(30deg)',
                  }}
                />
                <Box
                  position='absolute'
                  zIndex={2}
                  marginTop='4px'
                  color={theme.physicalColor}
                >
                  {stats.physicalArmor}
                </Box>
              </Box>
            )}
            {stats.specialArmor > 0 && (
              <Box
                position='absolute'
                height='56px'
                width='56px'
                zIndex={2}
                top='-59px'
                left='-116px'
                paddingTop='2px'
                alignItems='center'
                justifyContent='center'
                style={{
                  fontFamily: 'Trade Winds',
                  fontSize: '12px',
                }}
              >
                <Hexagon
                  size={32}
                  color='rgba(37, 39, 60, 1)'
                  borderWidth={2}
                  borderColor='rgba(255,255,255,0.54)'
                  style={{
                    transform: 'rotate(30deg)',
                  }}
                />
                <Box
                  position='absolute'
                  zIndex={2}
                  marginTop='4px'
                  color={theme.specialColor}
                >
                  {stats.specialArmor}
                </Box>
              </Box>
            )}
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
        marginLeft='56px'
      >
        <Box flexDirection='row'>
          {getImmunities(character).map((status) => (
            <CombatCharacterStatus key={status.id} status={status} color='plum'>
              <ImmunityCard status={status} />
            </CombatCharacterStatus>
          ))}
        </Box>
        <Box flexDirection='row' justifyContent='flex-end'>
          {getStatuses(character).map((status) => (
            <CombatCharacterStatus key={status.id} status={status} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
