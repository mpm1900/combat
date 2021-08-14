import { FunctionComponent } from 'react'
import { Status } from '../../../types/status/status'
import { BoxProps } from '../Box'
import { Icon } from '../Icon'
import { ReactComponent as Burned } from '../../../icons/carl-olsen/flame.svg'
import { ReactComponent as Cursed } from '../../../icons/lorc/cursed-star.svg'
import { ReactComponent as Dazed } from '../../../icons/lorc/star-swirl.svg'
import { ReactComponent as Evasive } from '../../../icons/lorc/sprint.svg'
import { ReactComponent as Focused } from '../../../icons/delapouite/polar-star.svg'
import { ReactComponent as Protected } from '../../../icons/delapouite/vibrating-shield.svg'
import { ReactComponent as Resting } from '../../../icons/delapouite/night-sleep.svg'
import { ReactComponent as Shocked } from '../../../icons/lorc/lightning-trio.svg'
import { ReactComponent as Warped } from '../../../icons/delapouite/extra-time.svg'

import { ReactComponent as Normal } from '../../../icons/delapouite/plain-circle.svg'
import { ReactComponent as Fire } from '../../../icons/sbed/flamer.svg'
import { ReactComponent as Water } from '../../../icons/lorc/drop.svg'
import { ReactComponent as Thunder } from '../../../icons/lorc/power-lightning.svg'
import { ReactComponent as Grass } from '../../../icons/delapouite/oak-leaf.svg'
import { ReactComponent as Earth } from '../../../icons/delapouite/stone-pile.svg'
import { ReactComponent as Air } from '../../../icons/lorc/fluffy-wing.svg'
import { ReactComponent as Ghost } from '../../../icons/lorc/spectre.svg'
import { ReactComponent as Dark } from '../../../icons/sbed/death-skull.svg'
import { ReactComponent as Light } from '../../../icons/sbed/pulse.svg'
import { ReactComponent as Na } from '../../../icons/delapouite/perspective-dice-six-faces-random.svg'

const iconMap: Record<string, FunctionComponent> = {
  Cursed: Cursed,
  Burned: Burned,
  Dazed: Dazed,
  Evasive: Evasive,
  Focused: Focused,
  Protected: Protected,
  Resting: Resting,
  Shocked: Shocked,
  Warped: Warped,

  // TODO: find unique icon
  Wet: Water,
  'Earth Immunity': Earth,
}

export type StatusIconProps = BoxProps & {
  status: Status
}

export const StatusIcon = (props: StatusIconProps) => {
  const { status, ...rest } = props
  const Body = iconMap[status.name] || Na
  return (
    <Icon {...rest}>
      <Body />
    </Icon>
  )
}

StatusIcon.defaultProps = {
  height: '20px',
  width: '20px',
}
