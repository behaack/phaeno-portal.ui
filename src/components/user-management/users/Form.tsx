import { UseFormReturnType } from '@mantine/form';
import { IUser } from '@/assets/interfaces/_index';
import { PCheckbox, PTextInput } from '@/components/_index';

export interface IProps {
  mode: 'add' | 'edit';
  form: UseFormReturnType<IUser>;
}

export default function PatientForm({ mode, form }: IProps) {
  return (
    <div className="mb-2">
      <PTextInput
        name={form.key('email')}
        label="Email Address"
        placeholder="Email Address"
        withAsterisk
        maxLength={256}
        disabled={mode === 'edit'}
        {...form.getInputProps('email')}
      />

      <PTextInput
        name={form.key('firstName')}
        label="First Name"
        placeholder="First Name"
        withAsterisk
        maxLength={60}
        {...form.getInputProps('firstName')}
      />

      <PTextInput
        name={form.key('lastName')}
        label="Last Name"
        placeholder="Last Name"
        withAsterisk
        maxLength={60}
        {...form.getInputProps('lastName')}
      />

      <PCheckbox
        name={form.key('isAdmin')}
        label="Is Administrator"
        {...form.getInputProps('isAdmin', { type: 'checkbox' })}
      />
    </div>
  );
}
