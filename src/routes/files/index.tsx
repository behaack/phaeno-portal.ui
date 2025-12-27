import { useEffect, useMemo, useState } from 'react';
import { IconDownload, IconFile, IconFolder } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { Button, Checkbox, Table, TableCaption } from '@mantine/core';
import { EFileRoomItemType, EOrganizationType } from '@/assets/enums/_index';
import { IFileRoomItem } from '@/assets/interfaces/_index';
import { searchSchema } from '@/assets/route-validator/file';
import { DisplayFileSize } from '@/components/_index';
import { FileErrorBoundary } from '@/components/errorBoundries/File';
import { utilities } from '@/compostables/utilities';
import { useDatabase } from '@/hooks/useDatabase';
import { useAuthStore } from '@/stores/authStore';
import { beforeLoadAuth } from '../../assets/route-guard';
import PathNavigator from '@/components/file-room/pathNavigator';

interface IFilteredListItem extends IFileRoomItem {
  isChecked: boolean;
}

export const Route = createFileRoute('/files/')({
  component: FileRoomIndex,
  validateSearch: (search) => searchSchema.parse(search),
  errorComponent: FileErrorBoundary,
  beforeLoad: beforeLoadAuth,
});

function FileRoomIndex() {
  const db = useDatabase();
  const authStore = useAuthStore();
  const [list, setList] = useState<IFileRoomItem[]>([]);
  const [filteredList, setFilteredList] = useState<IFilteredListItem[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const { parentid } = Route.useSearch();

  useEffect(() => {
    getFolderData();
  }, []);

  useEffect(() => {
    getFolderData();
  }, [authStore.selectedOrganization?.value]);

  useEffect(() => {
    const allItemsChecked =
      filteredList.filter((item) => item.isChecked === true).length === filteredList.length;
    setAllChecked(allItemsChecked);
  }, [filteredList]);

  useEffect(() => {
    const filtered: IFilteredListItem[] = utilities().multiSort(
      list.filter((item) => item.parentId === parentid),
      { type: 'asc', name: 'asc' }
    );
    setFilteredList(filtered);
  }, [list, parentid]);

  const listUrl = useMemo(() => {
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno) {
      return `FileRooms/${authStore.selectedOrganization?.value}`;
    }
    return 'FileRooms';
  }, [authStore.authToken?.organization, authStore.selectedOrganization?.value]);

  const getFolderData = () => {
    db.httpGet<IFileRoomItem[]>(listUrl, true).then((response) => {
      if (response.success) {
        if (response.data) {
          setList(response.data);
        }
      }
    });
  };

  const hasChildren = (id: string) => {
    return list.filter((item) => item.parentId === id).length > 0;
  };

  const nodeName = (item: IFileRoomItem) => {
    return (
      <div className="flex gap-2">
        {item.type === EFileRoomItemType.Folder ? <IconFolder size={19} /> : <IconFile size={19} />}
        {item.name}
      </div>
    );
  };

  const getFolderSize = (id: string) => {
    let totalSize = 0;
    const folderItems = list.filter((item) => item.parentId === id);
    folderItems.forEach((item) => {
      if (item.type === EFileRoomItemType.File) {
        totalSize += item.size;
      } else {
        totalSize += getFolderSize(item.id);
      }
    });

    return totalSize;
  };

  const downloadDisabled = useMemo(() => {
    return !(filteredList.filter((item) => item.isChecked === true).length > 0);
  }, [filteredList]);

  const itemChecked = (id: string, value: boolean) => {
    const index = filteredList.findIndex((item) => item.id === id);
    const newItem = {
      ...filteredList[index],
      isChecked: value,
    };
    setFilteredList((current) => {
      return [...current.slice(0, index), newItem, ...current.slice(index + 1, current.length)];
    });
  };

  const toggleAllRows = (checked: boolean) => {
    setAllChecked(checked);
    const newFilteredList: IFilteredListItem[] = [];
    filteredList.forEach((item) => {
      newFilteredList.push({
        ...item,
        isChecked: checked,
      });
    });
    setFilteredList(newFilteredList);
  };

  const downloadHndl = () => {
    const selection = filteredList.filter((item) => item.isChecked === true).map((item) => item.id);
    const data = {
      contentList: selection,
    };
    db.httpPostDownload<any, any>('FileRooms/download', data, true).then((response) => {
      if (response.success) {
        if (response.data) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `${uuidv4()}.zip`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
      }
    });
  };

  const viewContents = useMemo(() => {
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno) {
      return authStore.selectedOrganization != null
    }
    return true;
  }, [authStore.authToken?.organization, authStore.selectedOrganization])  

  return (
    <main>
      <section>        
        <div className="flex justify-between items-center mb-2">
          <h1 className="flex items-center gap-2">
            <IconFile size={25}/>
            File Browser
          </h1>
          {(viewContents)
            ? (
              <Button
              disabled={downloadDisabled}
              rightSection={<IconDownload size={20} />}
              onClick={downloadHndl}
              >
                Download
              </Button>
            ) : null
          }
        </div>
        {(viewContents) ? (
          <>
            <PathNavigator fileList={list} id={parentid} />
            <Table withTableBorder withColumnBorders stickyHeader stickyHeaderOffset={50} striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '20px' }}>
                    <div className="flex justify-center">
                      <Checkbox
                        checked={allChecked}
                        onChange={(e) => toggleAllRows(e.currentTarget.checked)}
                        size="xs"
                      />
                    </div>
                  </Table.Th>
                  <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>Name</Table.Th>
                  <Table.Th
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      width: '100px',
                      textAlign: 'right',
                    }}
                  >
                    Size
                  </Table.Th>
                  <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '100px' }}>
                    Created on
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredList.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Checkbox
                        size="xs"
                        checked={item.isChecked}
                        onChange={(e) => itemChecked(item.id, e.currentTarget.checked)}
                      />
                    </Table.Td>
                    <Table.Td>
                      {hasChildren(item.id) ? (
                        <Link
                          to="/files"
                          search={{
                            parentid: item.id,
                          }}
                        >
                          {nodeName(item)}
                        </Link>
                      ) : (
                        nodeName(item)
                      )}
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <DisplayFileSize
                        value={
                          item.type === EFileRoomItemType.File ? item.size : getFolderSize(item.id)
                        }
                      />
                    </Table.Td>
                    <Table.Td>{DateTime.fromISO(item.createdOn).toLocaleString()}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
              {!filteredList.length && <TableCaption>Nothing to report</TableCaption>}
            </Table>
          </>
        ) : (
          <div className="text-center mt-10">To view data, select an organization from the dropdown menu.</div>
        )}
      </section>
    </main>
  );
}
