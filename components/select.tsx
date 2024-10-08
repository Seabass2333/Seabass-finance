'use client'
import { useMemo } from 'react'
import { SingleValue } from 'react-select'

import CreateableSelect from 'react-select/creatable'

type Props = {
  onChange: (value?: string) => void
  onCreate?: (name: string) => void
  options?: { value: string; label: string }[]
  value?: string | null | undefined
  disabled?: boolean
  placeholder?: string
}
const Select = ({
  onChange,
  onCreate,
  options = [],
  value,
  disabled,
  placeholder
}: Props) => {
  const onSelect = (
    option: SingleValue<{
      label: string
      value: string
    }>
  ) => {
    onChange(option?.value)
  }

  // const handleCreate = (name: string) => {
  //   onCreate?.(name)
  // }

  const formattedValues = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  return (
    <CreateableSelect
      placeholder={placeholder}
      options={options}
      value={formattedValues}
      onChange={onSelect}
      onCreateOption={onCreate}
      isDisabled={disabled}
      className='text-sm h-10'
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e2e8f0',
          ':hover': {
            borderColor: '#e2e8f0'
          }
        })
      }}
    />
  )
}

export default Select
