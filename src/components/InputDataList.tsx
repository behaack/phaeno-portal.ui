import { JSX, useEffect, useMemo, useRef, useState } from 'react';
import { CloseButton, Loader } from '@mantine/core';
import { ILookupItem } from '@/assets/interfaces/_index';
import PTextInput from './PTextInput';

export interface IProps {
  data: string[] | ILookupItem[];
  mah?: number;
  mih?: number;
  loading?: boolean;
  searchValue?: string;
  noDataMessage?: string;
  leftSection?: JSX.Element;
  clearButton?: boolean;
  onSearchValueChange?: (value: string) => void;
  onSelect?: (value: string | ILookupItem | null) => void;
}

export default function DataList({
  data,
  mah = 200,
  mih = 200,
  loading = false,
  clearButton = false,
  searchValue = '',
  noDataMessage = 'No matching records',
  onSearchValueChange,
  onSelect,
  leftSection,
}: IProps) {
  const [, forceUpdate] = useState<any>();
  const [clearButtonVisible, setClearButtonVisible] = useState<boolean>(false);
  const selectedIndex = useRef<number>(-1);

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('keydown', keyBoardListener);
    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', keyBoardListener);
    };
  }, []);

  useEffect(() => {
    setClearButtonVisible(searchValue !== '' && clearButton);
  }, [searchValue]);

  const isStringList = (array: string[] | ILookupItem[]): array is string[] => {
    if (!array.length) {
      return typeof '' === 'string';
    }
    return typeof array[0] === 'string';
  };

  const maxHeight = useMemo(() => {
    return mah ? `${mah}px` : 'none';
  }, [mah]);

  const minHeight = useMemo(() => {
    return mih ? `${mih}px` : 'none';
  }, [mih]);

  const list = useMemo(() => {
    if (isStringList(data)) {
      return data.map((item: string) => {
        const newItem: ILookupItem = {
          value: item,
          label: item,
        };
        return newItem;
      });
    }
    return data;
  }, [data]);

  const selectedItem = useMemo(() => {
    if (selectedIndex.current < 0 || selectedIndex.current > list.length - 1) {
      return null;
    }
    return list[selectedIndex.current];
  }, [list, selectedIndex.current]);

  const keyBoardListener = (e: React.KeyboardEvent) => {
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      let index = selectedIndex.current;
      if (index <= 0) {
        index = data.length - 1;
      } else {
        index--;
      }
      selectedIndex.current = index;
      forceUpdate(index);
      scrollIntoView(list[index].value);
    }

    if (e.code === 'ArrowDown') {
      e.preventDefault();
      let index = selectedIndex.current;
      if (index >= data.length - 1) {
        index = 0;
      } else {
        index++;
      }
      selectedIndex.current = index;
      forceUpdate(index);
      scrollIntoView(list[index].value);
    }
  };

  const scrollIntoView = (elementId: string): void => {
    const container = document.getElementById('INPUT-DATA-CONTAINER');
    const element = document.getElementById(elementId);

    if (container === null || element == null) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const isFullyInView =
      elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom;

    if (!isFullyInView) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onChangeHndl = (value: string) => {
    if (onSearchValueChange) {
      onSearchValueChange(value);
    }
  };

  const clearContentsHndl = () => {
    if (onSearchValueChange) {
      onSearchValueChange('');
    }
  };

  const keydownHndl = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (selectedItem) {
        processOnSelect(selectedItem);
      }
    }
  };

  const clickHndl = (itemKey: string) => {
    if (onSelect) {
      const index = list.findIndex((item) => item.value === itemKey);
      if (index >= 0) {
        processOnSelect(list[index]);
      }
    }
  };

  const processOnSelect = (processItem: ILookupItem) => {
    if (onSelect) {
      let returnVal: string | ILookupItem | null = processItem;
      if (isStringList(data)) {
        returnVal = processItem?.label || null;
      }
      onSelect(returnVal);
    }
  };

  return (
    <div>
      <PTextInput
        data-autofocus
        value={searchValue}
        onChange={(e) => onChangeHndl(e.currentTarget.value)}
        onKeyDown={(e) => keydownHndl(e)}
        leftSection={leftSection}
        rightSection={
          loading ? (
            <Loader size={16} />
          ) : (
            clearButtonVisible && (
              <CloseButton size="lg" variant="transparent" onClick={clearContentsHndl} />
            )
          )
        }
      />
      <div id="INPUT-DATA-CONTAINER" style={{ maxHeight, minHeight }} className="input-data-list">
        {data.length ? (
          <ul>
            {list.map((item) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <li id={item.value} key={item.value} onClick={() => clickHndl(item.value)}>
                <div className={`${item === selectedItem ? 'selected' : ''}`}>{item.label}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-3 text-center">{noDataMessage}</div>
        )}
      </div>
    </div>
  );
}
