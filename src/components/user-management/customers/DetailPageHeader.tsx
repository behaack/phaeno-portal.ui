import '@/styles/user-mgmt-components.scss';

import { JSX, useEffect } from 'react';
import { IconList } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { ActionIcon } from '@mantine/core';
import { Route as ListRoute } from '@/routes/manage-users/index';

export interface IProps {
  page: number;
  searchStr: string;
  title: string;
  icon: JSX.Element;
  onQueryParamChange: (pageNo: number, searchStr: string) => void;
}

export default function DetailPageHeader({
  page,
  searchStr,
  title,
  icon,
  onQueryParamChange,
}: IProps) {
  const navigate = useNavigate();

  useEffect(() => {
    onQueryParamChange(page, searchStr);
  }, []);

  const listReturnHndl = () => {
    navigate({
      to: ListRoute.to,
      search: {
        type: 'customer',
        pageno: page,
        searchstr: searchStr,
      },
    });
  };

  return (
    <div className="flex justify-between mb-4">
      <div className="inline-flex items-center gap-2">
        {icon}
        <h1>{title}</h1>
      </div>
      <div>
        <ActionIcon onClick={listReturnHndl} radius="xl" size="xl">
          <IconList />
        </ActionIcon>
      </div>
    </div>
  );
}
