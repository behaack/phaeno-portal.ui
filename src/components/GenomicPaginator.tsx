import { useMemo } from 'react';
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import { Button } from '@mantine/core';

export interface IProps {
  onPreviousPage: () => void;
  onNextPage: () => void;
  hasAdditional?: boolean;
  page: number;
}

export default function GenomicPaginator({
  onPreviousPage,
  onNextPage,
  hasAdditional = false,
  page,
}: IProps) {
  const prevPage = () => {
    if (page > 1) {
      onPreviousPage();
    }
  };

  const nextPage = () => {
    if (hasAdditional) {
      onNextPage();
    }
  };

  const disableNext = useMemo(() => {
    return !hasAdditional;
  }, [hasAdditional]);

  return (
    <div className="flex flex-row items-center gap-2 py-2">
      <Button size="sm" disabled={page <= 1} onClick={prevPage}>
        <IconCaretLeft />
      </Button>
      <div className="min-w-24 text-center">Page {page}</div>
      <Button size="sm" disabled={disableNext} onClick={nextPage}>
        <IconCaretRight />
      </Button>
    </div>
  );
}
