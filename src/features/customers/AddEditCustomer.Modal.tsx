import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NIL } from "uuid";
import { PModal } from "@/shared/ui/modals/Parts/PModal";
import { PModalHeader } from "@/shared/ui/modals/Parts/PModalHeader";
import { PModalFormFooter } from "@/shared/ui/modals/Parts/PModalFormFooter";
import { PModalBody } from "@/shared/ui/modals/Parts/PModalBody";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { organizationSchema, FormValues } from "./schema/organizationSchema";
import { TFormMode } from "@/shared/types/TFormMode";
import { EOrganizationType } from "@/api/types/enums";
import { Organization } from "@/api/types/organization";
import { useAddCustomer, useUpdateCustomer } from "@/api/hooks/customer.hooks";
import { CustomerForm } from "./components/CustomerForm";
import { IconBuilding } from "@tabler/icons-react";

export interface IHandles {
  add: () => void;
  edit: (organization: Organization) => void
}

interface IProps {}

export const AddEditCustomerModal = forwardRef<IHandles, IProps>((props, ref) => {
  const addMutation = useAddCustomer()
  const updateMutation = useUpdateCustomer()
  const formMode = useRef<TFormMode>('add')
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      id: NIL,
      organizationName: "",
      organizationType: EOrganizationType.Customer,
      street1: "",
      street2: "",
      city: "",
      state: "",
      postalCode: "",
      countryCode: "",
      rowVersion: null
    },
  });

  useImperativeHandle(ref, () => ({
    add() {
      formMode.current = "add"
      form.reset()
      setIsOpen(true);
    },
    edit(organization: Organization) {
      formMode.current = "edit"
      form.reset(organization);
      setIsOpen(true);
    }
  }));    
  
  const submitHndl = async (model: FormValues) => {
    console.log(model);
    if (formMode.current === "add") {
      try {
        await addMutation.mutateAsync(model as Organization)
        form.reset()
        setIsOpen(false)
      } catch (error) {
      }      
    } else {
      try {
        await updateMutation.mutateAsync(model as Organization)
        form.reset()
        setIsOpen(false)        
      } catch (error) {
      }
    }
    setIsOpen(false)
  }
    
  return (
    <PModal    
      onClose={()=>{}}
      opened={isOpen}
      size="lg"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitHndl)}>
          <PModalHeader
            icon={<IconBuilding size={21} />} 
            title={`${(formMode.current === "add") ? "Add" : "Update"} Customer`}
            onClose={() => setIsOpen(false)} />
          <PModalBody className="py-3 px-5">
            <CustomerForm formMode={formMode.current}/>
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