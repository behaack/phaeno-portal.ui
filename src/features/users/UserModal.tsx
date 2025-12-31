import { forwardRef, useImperativeHandle, useState } from "react"
import { PModalDialog } from "@/shared/ui/modals/PModalDialog";
import { ScrollArea } from "@mantine/core";
import { useDeviceSize } from "@/shared/hooks/useDeviceSize";
import { useGetCustomers } from "@/api/hooks/customer.hooks";
import { IconUsers } from "@tabler/icons-react";

export interface IProps {
}

export interface IHandles {
  open: () => void;
  close: () => void;
}

export const UserModal = forwardRef<IHandles, IProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width, height] = useDeviceSize()
  

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false)
    }
  }));  

  return (
    <PModalDialog 
      title="Users"
      icon={<IconUsers />} 
      size="xl" 
      opened={isOpen} 
      onClose={() => setIsOpen(false)}
    >
      <ScrollArea h={height - 300}>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
        <div>sdasdfasdfasdf</div>
      </ScrollArea>
    </PModalDialog>
  )
})