import { Controller, useFormContext } from 'react-hook-form'
import { PSelect, type PSelectProps } from '@/shared/ui/components/inputs'
import { PFormField } from '../PFormField'

interface RHFSelectProps extends PSelectProps {
  name: string
  label?: string
  description?: string
  required?: boolean
}

export function RHFSelect({ name, label, description, required, ...inputProps }: RHFSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <PFormField label={label} description={description} error={error} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <PSelect {...field} {...inputProps} />}
      />
    </PFormField>
  )
}
