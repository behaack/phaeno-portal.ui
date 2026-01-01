import { UserDetails } from "@/api/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NIL } from "uuid";
import { PModal } from "@/shared/ui/modals/Parts/PModal";
import { PModalHeader } from "@/shared/ui/modals/Parts/PModalHeader";
import { PModalFormFooter } from "@/shared/ui/modals/Parts/PModalFormFooter";
import { PModalBody } from "@/shared/ui/modals/Parts/PModalBody";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { userSchema } from "./schema/userSchema";
import { UserForm } from "./components/UserForm";
import { TFormMode } from "@/shared/types/TFormMode";

export interface IHandles {
  add: (organizationId: string) => void;
  edit: (user: UserDetails) => void
}

interface IProps {}

export const AddEditUserModal = forwardRef<IHandles, IProps>((props, ref) => {
  const formMode = useRef<TFormMode>('add')
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const form = useForm<UserDetails>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: NIL,
      organizationId: "organizationId",
      email: "",
      firstName: "",
      lastName: "",
      isAdmin: false,
      isSetup: false,
      rowVersion: null
    },
  });

  useImperativeHandle(ref, () => ({
    add(organizationId: string) {
      formMode.current = "add"
      form.reset()
      form.setValue("organizationId", organizationId)
      setIsOpen(true);
    },
    edit(user: UserDetails) {
      formMode.current = "edit"
      form.reset(user);
      setIsOpen(true);
    }
  }));    
  
  const submitHndl = (model: UserDetails) => {
    if (formMode.current === "add") {
      console.log("add", model);
    } else {
      console.log("edit", model);
    }
    setIsOpen(false)
  }
    
  return (
    <PModal    
      onClose={()=>{}}
      opened={isOpen}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitHndl)}>
          <PModalHeader
            icon={<IconUser size={21} />} 
            title={`${(formMode.current === "add") ? "Add" : "Edit"} User`}
            onClose={() => setIsOpen(false)} />
          <PModalBody>
            <UserForm formMode={formMode.current}/>
          </PModalBody>
          <PModalFormFooter showRequired isDisabled={!form.formState.isValid} onClose={() => setIsOpen(false)}/>
        </form>
      </FormProvider>
    </PModal>
  )
})