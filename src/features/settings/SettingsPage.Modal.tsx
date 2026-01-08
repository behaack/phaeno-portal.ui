import { PTabs, PTabsList, PTabsPanel, PTabsTab } from "@/shared/ui/components/layout";
import { PModalDialog } from "@/shared/ui/modals/PModalDialog";
import { IconKey } from "@tabler/icons-react";
import { IconSettings, IconPassword, IconShieldCheck  } from "@tabler/icons-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ChangePasswordPanel } from "./ChangePassword/ChangePasswordPanel";
import { TwoFactorPanel } from "./TwoFactor/TwoFactorPanel";
import { ApiKeysPanel } from "./ApiKeys/ApiKeysPanel";

export interface IHandles {
  open: () => void;
}

interface IProps {}

export const SettingsPageModal = forwardRef<IHandles, IProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
  }));   
  
  return (
    <PModalDialog 
      icon={<IconSettings />}
      title="Settings & Security"
      size="xl"
      opened={isOpen} 
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-96 py-3 px-2">
        <PTabs className="min-h-96" orientation="vertical" variant="outline" radius="xl" defaultValue="password">
          <PTabsList>
            <PTabsTab               
              value="password" 
              leftSection={<IconPassword size={15} />}
            >
              Change Password
            </PTabsTab>
            <PTabsTab 
              value="two-factor" 
              leftSection={<IconShieldCheck size={15} />}
            >
              Two-factor
            </PTabsTab>  
            <PTabsTab 
              value="api-keys" 
              leftSection={<IconKey size={15} />}
            >
              Api Keys
            </PTabsTab>                       
          </PTabsList>
          <div className="px-6 w-full">
            <PTabsPanel value="password">
              <ChangePasswordPanel />
            </PTabsPanel>
            <PTabsPanel value="two-factor">
              <TwoFactorPanel />
            </PTabsPanel>
            <PTabsPanel value="api-keys">
              <ApiKeysPanel />
            </PTabsPanel>
          </div>
        </PTabs>
      </div>
    </PModalDialog>
  )

})