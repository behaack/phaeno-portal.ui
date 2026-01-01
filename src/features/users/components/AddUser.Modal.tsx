import { UserDetails } from "@/api/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NIL } from "uuid";
import { userSchema } from "../schema/userSchema";
import { UserForm } from "./UserForm";
import { PModal } from "@/shared/ui/modals/Parts/PModal";
import { PModalHeader } from "@/shared/ui/modals/Parts/PModalHeader";
import { PModalFormFooter } from "@/shared/ui/modals/Parts/PModalFormFooter";
import { PModalBody } from "@/shared/ui/modals/Parts/PModalBody";
import { forwardRef, useImperativeHandle, useState } from "react";
import { IconUser } from "@tabler/icons-react";

export interface IProps {
}

export interface IHandles {
  open: (organizationId: string) => void;
  close: () => void;
}


export const AddUserModal = forwardRef<IHandles, IProps>((props, ref) => {
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
    open(organizationId: string) {
      setIsOpen(true);
      form.setValue("organizationId", organizationId)
    },
    close() {
      setIsOpen(false)
    }
  }));    
  
  const submitHndl = (model: UserDetails) => {
    console.log(model)
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
            title="Add User"
            onClose={() => {}} />
          <PModalBody>
                <UserForm />
          </PModalBody>
          <PModalFormFooter onClose={() => {}}/>
        </form>
      </FormProvider>
    </PModal>
  )
})