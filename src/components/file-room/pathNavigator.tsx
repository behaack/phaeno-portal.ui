import '@/styles/file-room.scss';

import { useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { IFileRoomItem } from '@/assets/interfaces/_index';
import { Route } from '@/routes/files/index';

export interface IProps {
  id: string | null;
  fileList: IFileRoomItem[];
}

export interface INavigationItem {
  folderId: string | null;
  name: string;
}

export default function PathNavigator({ id, fileList }: IProps) {
  const getNavigationPath = (nodeId: string | null | undefined): INavigationItem[] => {
    const path: INavigationItem[] = [];

    if (nodeId === null || nodeId === undefined) {
      return path;
    }

    const index = fileList.findIndex((item) => item.id === nodeId);
    if (index >= 0) {
      const navItem: INavigationItem = {
        folderId: fileList[index].id,
        name: fileList[index].name,
      };
      path.push(navItem);
      const result = getNavigationPath(fileList[index].parentId);
      path.unshift(...result);
    }
    return path;
  };

  const navigationPath = useMemo(() => {
    return getNavigationPath(id);
  }, [id, fileList]);

  return (
    <div className="path-navigator">
      {navigationPath.length > 0 ? (
        <>
          <Link
            to={Route.to}
            search={{
              parentid: null,
            }}
          >
            [My Data]
          </Link>{' '}
          |{' '}
        </>
      ) : null}
      {navigationPath.map((item, index) => (
        <span key={item.folderId}>
          {index === 0 ? '' : ' | '}
          {index === navigationPath.length - 1 ? (
            item.name
          ) : (
            <Link
              to={Route.to}
              search={{
                parentid: item.folderId,
              }}
            >
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
