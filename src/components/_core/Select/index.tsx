import ReactSelect, { Props } from 'react-select'
import { theme } from '../../../theme'

export const Select = (props: Props) => {
  return (
    <ReactSelect
      {...props}
      styles={{
        container: (provided, state) => ({
          ...provided,
          background: theme.boxGradient,
          color: 'black',
        }),
        control: (provided) => ({
          ...provided,
          background: 'rgba(0,0,0,0.18)',
          borderColor: 'rgba(255,255,255,0.45)',
        }),
        menu: (provided) => ({
          ...provided,
          background: theme.boxGradient,
          border: '1px solid rgba(255,255,255,0.45)',
          color: 'rgba(255,255,255,0.72)',
          zIndex: 3,
        }),
        option: (provided, { isFocused, isSelected }) => ({
          ...provided,
          backgroundColor:
            isFocused || isSelected
              ? 'rgba(255,255,255,0.18)'
              : 'rgba(255,255,255,0)',
          ':active': {
            backgroundColor: 'rgba(255,255,255,0.36)',
          },
        }),
        input: (provided) => ({
          ...provided,
          color: 'white',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'white',
          fontFamily: 'Trade Winds',
        }),
      }}
    />
  )
}
