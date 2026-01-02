import { PTabs, PTabsList, PTabsPanel, PTabsTab } from "@/shared/ui/components/layout";
import { PModalDialog } from "@/shared/ui/modals/PModalDialog";
import { TextInput } from "@mantine/core";
import { IconKey } from "@tabler/icons-react";
import { IconSettings, IconClock, IconPassword, IconShieldCheck  } from "@tabler/icons-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ChangePasswordPanel } from "./ChangePassword/ChangePasswordPanel";
import { TwoFactorPanel } from "./TwoFactor/TwoFactorPanel";
import { ApiKeysPanel } from "./ApiKeys/ApiKeysPanel";
import { OtherSettingsPanel } from "./OtherSettings/OtherSettingsPanel";

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
      <div className="min-h-96">
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
              value="other" 
              leftSection={<IconSettings size={15} />}
            >
              Other Settings
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
            <PTabsPanel value="other">
              <OtherSettingsPanel />
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