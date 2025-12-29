import { useMemo } from 'react';
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import { Button } from '@mantine/core';

export interface IProps {
  page: number;
  onPageChange: (page: number) => void;
  pageCount?: number;
}

export function PPaginator({ page, onPageChange, pageCount = 0 }: IProps) {
  const prevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const nextPage = () => {
    if (page < pageCount) {
      onPageChange(page + 1);
    }
  };

  const disableNext = useMemo(() => {
    return page >= pageCount;
  }, [page, pageCount]);

  return (
    <div className="flex flex-row items-center gap-2 py-2">
      <Button size="sm" disabled={page === 1} onClick={prevPage}>
        <IconCaretLeft />
      </Button>
      <div className="min-w-36 text-center text-sm">
        <span>
          Page {page.toLocaleString('en-US', { minimumFractionDigits: 0 })} of{' '}
          {pageCount.toLocaleString('en-US', { minimumFractionDigits: 0 })}
        </span>
      </div>
      <Button size="sm" disabled={disableNext} onClick={nextPage}>
        <IconCaretRight />
      </Button>
    </div>
  );
}
