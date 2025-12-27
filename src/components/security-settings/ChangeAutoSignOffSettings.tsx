import { useEffect, useMemo, useState } from 'react';
import { Button, NumberInput, Switch } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDatabase } from '@/hooks/useDatabase';
import { useAuthStore } from '@/stores/authStore';

export interface IProps {}

export default function ChangeAutoSignOffSettings() {
  const db = useDatabase();
  const authStore = useAuthStore();
  const [autoSignout, setAutoSignout] = useState<boolean>(false);
  const [signoutTime, setSignoutTime] = useState<number | undefined>(undefined);

  useEffect(() => {
    intializeForm();
  }, []);

  const intializeForm = () => {
    const isAuto = authStore.authToken?.user.inactiveSignout !== null;
    setAutoSignout(isAuto);
    if (isAuto) {
      if (authStore.authToken?.user.inactiveSignout) {
        setSignoutTime(authStore.authToken?.user.inactiveSignout);
      }
    }
  };

  const disableTimeoutBtn = useMemo(() => {
    const signoutValue = signoutTime === undefined ? null : signoutTime;
    return signoutValue === authStore.authToken?.user.inactiveSignout;
  }, [signoutTime, authStore.authToken?.user.inactiveSignout]);

  const timeoutPeriodChgHndl = (value: number | string) => {
    const normalizedValue = typeof value === 'number' ? value : undefined;
    setSignoutTime(normalizedValue);
  };

  const autoSignoffChangeHndl = (value: boolean) => {
    const time = value ? 30 : undefined;
    setSignoutTime(time);
    setAutoSignout(value);
  };

  const saveChanges = () => {
    const inactiveSignout = signoutTime === undefined ? null : signoutTime;
    const data = {
      userId: authStore.authToken?.userId,
      inactiveSignout,
    };
    db.httpPut<null, any>('users/timeout-settings', data, true).then((response) => {
      if (response.success) {
        authStore.updateTimeoutSetting(inactiveSignout);
        notifications.show({
          color: 'green',
          title: 'Success',
          message: 'Your changes have been saved. They will immediatedly take effect.',
        });
      }
    });
  };

  return (
    <div>
      <div className="text-md font-bold">Automatic Sign-out Settings</div>
      <div className="text-xs">
        Automatically sign me out after {`${autoSignout ? signoutTime : '[N]'}`} minutes of
        inactivity
      </div>
      <div className="flex row items-end gap-9">
        <Switch
          checked={autoSignout}
          onChange={(e) => autoSignoffChangeHndl(e.currentTarget.checked)}
          onLabel="ON"
          offLabel="OFF"
          size="xl"
        />

        <NumberInput
          label="Minutes"
          min={autoSignout ? 5 : undefined}
          maw={100}
          value={signoutTime ?? undefined}
          onChange={timeoutPeriodChgHndl}
          disabled={!autoSignout}
          size="sm"
        />
      </div>
      <div className="flex justify-end mt-3">
        <Button onClick={saveChanges} disabled={disableTimeoutBtn} size="xs">
          Save Timeout Settings
        </Button>
      </div>
    </div>
  );
}
