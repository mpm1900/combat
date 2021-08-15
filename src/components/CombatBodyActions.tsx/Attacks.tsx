import { useState } from 'react'
import { useCombatSystem } from '../../contexts/CombatSystemContext'
import { useCombatSystemBuffer } from '../../contexts/CombatSystemContext/CombatSystemBuffer'
import { Character } from '../../types/character/character'
import { Move as MoveType } from '../../types/move'
import { Move } from '../Move'
import { Box } from '../_core/Box'
import { Button } from '../_core/Button'
import { ElementalIcon } from '../_core/ElementalIcon'

export type CombatBodyActionsAttacksProps = {
  character: Character
}

export const CombatBodyActionsAttacks = (
  props: CombatBodyActionsAttacksProps,
) => {
  const { character } = props
  const { getCharacterStats } = useCombatSystem()
  const stats = getCharacterStats(character.id)
  const { bufferMove } = useCombatSystemBuffer()
  const [activeMove, setActiveMove] = useState<MoveType | undefined>(
    character.moves[0],
  )
  return (
    <Box flex='1' flexDirection='row' alignItems='flex-start'>
      <Box
        flex='1'
        padding='8px 4px 8px 8px'
        overflowY='scroll'
        maxHeight='288px'
      >
        {character?.moves?.map((move) => (
          <Box onMouseEnter={() => setActiveMove(move)}>
            <Button
              key={move.id}
              alignItems='center'
              flexDirection='row'
              marginTop='8px'
              padding='8px'
              width='200px'
              disabled={
                !stats ||
                stats.energy - character.energyOffset < move.energyCost
              }
              isHovering={move.id === activeMove?.id}
              onClick={() => {
                bufferMove(move)
              }}
            >
              <ElementalIcon height='20px' type={move.element} />
              <Box>{move.name}</Box>
            </Button>
          </Box>
        ))}
      </Box>
      <Box flex='1' justifyContent='center'>
        {activeMove && <Move move={activeMove} character={character}></Move>}
      </Box>
    </Box>
  )
}
