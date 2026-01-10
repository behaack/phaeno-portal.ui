import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconUser } from '@tabler/icons-react'
import { FormProvider, useForm } from 'react-hook-form'
import { NIL } from 'uuid'
import { useAddUser, useUpdateUser } from '@/api/hooks/userHooks'
import { UserDetails } from '@/api/types/user'
import { TFormMode } from '@/shared/types/TFormMode'
import { PModal } from '@/shared/ui/modals/Parts/PModal'
import { PModalBody } from '@/shared/ui/modals/Parts/PModalBody'
import { PModalFormFooter } from '@/shared/ui/modals/Parts/PModalFormFooter'
import { PModalHeader } from '@/shared/ui/modals/Parts/PModalHeader'
import { UserForm } from './components/UserForm'
import { userSchema } from './schema/userSchema'

export interface IHandles {
  add: (organizationId: string) => void
  edit: (user: UserDetails) => void
}

interface IProps {}

export const AddEditUserModal = forwardRef<IHandles, IProps>((props, ref) => {
  const addMutation = useAddUser()
  const editMutation = useUpdateUser()
  const formMode = useRef<TFormMode>('add')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<UserDetails>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: NIL,
      organizationId: 'organizationId',
      email: '',
      firstName: '',
      lastName: '',
      isAdmin: false,
      isSetup: false,
      rowVersion: null,
    },
  })

  useImperativeHandle(ref, () => ({
    add(organizationId: string) {
      formMode.current = 'add'
      form.reset()
      form.setValue('organizationId', organizationId)
      setIsOpen(true)
    },
    edit(user: UserDetails) {
      formMode.current = 'edit'
      form.reset(user)
      setIsOpen(true)
    },
  }))

  const submitHndl = async (model: UserDetails) => {
    if (formMode.current === 'add') {
      try {
        await addMutation.mutateAsync(model)
        form.reset()
        setIsOpen(false)
      } catch (error) {}
    } else {
      try {
        await editMutation.mutateAsync(model)
        form.reset()
        setIsOpen(false)
      } catch (error) {}
    }
    setIsOpen(false)
  }

  return (
    <PModal onClose={() => {}} opened={isOpen} size="lg">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitHndl)}>
          <PModalHeader
            icon={<IconUser size={21} />}
            title={`${formMode.current === 'add' ? 'Add' : 'Update'} User`}
            onClose={() => setIsOpen(false)}
          />
          <PModalBody className="py-3 px-5">
            <UserForm formMode={formMode.current} />
          </PModalBody>
          <PModalFormFooter
            submitLabel="Save"
            showRequired
            isDisabled={!form.formState.isValid || !form.formState.isDirty}
            onClose={() => setIsOpen(false)}
          />
        </form>
      </FormProvider>
    </PModal>
  )
})
