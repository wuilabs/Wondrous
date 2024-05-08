import * as React from 'react'
import { AlertProps } from './AlertProps'
import resolveVariantColor from '../utils/resolveVariantColor'
import useSlot from '../utils/useSlot'
import clsx from 'clsx'

const useUtilityClasses = (props: AlertProps) => {
  const { color = 'neutral', variant = 'soft', size = 'md' } = props

  const variants = {
    plain: clsx('bg-[#fbfcfe]', `text-${color}-500`),
    outlined: clsx(
      'border',
      `border-${color}-500`,
      'bg-[#fbfcfe]',
      `text-${color}-500`
    ),
    soft: clsx(`bg-${color}-50`, `text-${color}-500`),
    solid: clsx(`bg-${color}-500`, 'text-white'),
  }

  return {
    root: clsx(
      'flex',
      'relative',
      'content-center',
      'rounded-md',
      'font-medium',

      // Size
      size == 'sm' && ['p-2', 'gap-2'],
      size == 'md' && ['p-3', 'gap-2.5'],
      size == 'lg' && ['p-4', 'gap-3.5'],

      // Variants
      variant == 'plain' && variants.plain,
      variant == 'outlined' && variants.outlined,
      variant == 'soft' && variants.soft,
      variant == 'solid' && variants.solid,
    ),
  }
}

export default function Alert(props: AlertProps) {
  const {
    children,
    className,
    color = 'neutral',
    endDecorator,
    role = 'alert',
    size = 'md',
    startDecorator,
    variant = 'soft',
    ...other
  } = props

  const classes = useUtilityClasses(props)
  const [SlotRoot, rootProps] = useSlot('div', {
    className: clsx(classes.root, className),
    color: color,
    role: role,
    size: size,
    variant: variant,
    ...other,
  })
  return <SlotRoot {...rootProps}>{children}</SlotRoot>
}
