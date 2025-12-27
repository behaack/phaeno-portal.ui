import '@/styles/user-mgmt-components.scss';
import { JSX, useEffect, useMemo } from 'react';
import { Button } from '@mantine/core';
import { useAuthStore } from '@/stores/authStore';
import { EOrganizationType } from '@/assets/enums/_index';
import Paginator from '@/_shared/ui/components/Paginator';
import SearchInput from '@/components/SearchInput';

export interface IProps {
  title: string;
  headerIcon?: JSX.Element;
  actionIcon?: JSX.Element;
  page: number;
  pageCount: number;
  listLength: number;
  searchValue: string;
  component?: boolean;
  onPageChange: (page: number) => void;
  onSearchChange: (searchValue: string) => void;
  onAddItem: () => void;
  onQueryParamChange: (pageNo: number, searchStr: string) => void;
}

export default function ListPageHeader({
  title,
  headerIcon,
  actionIcon,
  page,
  pageCount,
  searchValue,
  component = false,
  onPageChange,
  onSearchChange,
  onAddItem,
  onQueryParamChange,
}: IProps) {
  useEffect(() => {
    onQueryParamChange(page, '');
  }, []);
  const authStore = useAuthStore()

  const showTitle = useMemo(() => {
    if (authStore.authToken?.organization.organizationType !== EOrganizationType.Phaeno) {
      return false
    }
    return true
  },[authStore.authToken])

  return (
    <div className="user-mgmt-list-page-header">
      <div className="label-search-container">
        {(showTitle) 
          ? <div className="label-icon">          
              {headerIcon}
              <h3 className={`${component ? 'component' : ''}`}>{title}</h3>
            </div>
          : <div>&nbsp;</div>
        }
        <SearchInput value={searchValue} onSearchChange={onSearchChange} />
      </div>
      <div className="paginator-button">
        <div className="place-holder">&nbsp;</div>
        {pageCount > 1 ? (
          <div className="paginator">
            <Paginator page={page} pageCount={pageCount} onPageChange={onPageChange} />
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
        <div className="action-button">
          <Button rightSection={actionIcon} onClick={onAddItem}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
