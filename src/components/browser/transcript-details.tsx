import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconCopy, IconDna2 } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useClipboard, useTimeout } from '@mantine/hooks';
import { ITranscript } from '@/assets/interfaces/_index';
import { useDatabase } from '@/hooks/useDatabase';
import PModalDialog from '../PModalDialog';

export interface IProps {}

export interface IHandles {
  open: (id: number) => void;
}

const ModalTranscriptDetails = forwardRef<IHandles, IProps>((_props, ref) => {
  const db = useDatabase();
  const clipboard = useClipboard();
  const [opened, setOpened] = useState<boolean>(false);  
  const [tooltipLabel, setTooltipLabel] = useState<string>('Copy value to clipboard');
  const [data, setData] = useState<ITranscript | null>(null);
  const { start } = useTimeout(() => setTooltipLabel('Copy value to clipboard'), 500);

  useImperativeHandle(ref, () => ({
    open(id: number) {
      getData(id);
      setOpened(true);
    },
  }));

  const getData = (id: number) => {
    db.httpGet<ITranscript>(`transcripts/${id}`, true).then((response) => {
      if (response.success) {
        if (response.data) {
          setData(response.data);
        }
      } if (response.error?.status === 404) {
        notifications.show({
          color: 'red',
          title: 'Error: 404 - Transcript not found',
          message:
            'A Transcript with the provided Id could not be found. Returning you to the Transcript Browser',
          autoClose: true,
        });
      }
    });
  };

  const copyToClipboard = (value: string | null | undefined) => {
    clipboard.copy(value);
    setTooltipLabel('Copied!');
    start();
  };

  return (
    <PModalDialog
      title="Transcript Details"
      opened={opened}
      onClose={() => setOpened(false)}
      size="xl"
      icon={<IconDna2 size={21} />}
      hideFooter
      top
    >
      <div>
        <ul className="property-group-container">
          <li>
            <div className="property-name">Id</div>
            <div className="property-value">{data?.id}</div>
          </li>
          <li>
            <div className="property-name">Sample</div>
            <div className="property-value">{data?.sampleName}</div>
          </li>          
          <li>
            <div className="property-name">Transcript Id</div>
            <div className="property-value">{data?.transcript_id}</div>
          </li>
          <li>
            <div className="property-name">Gene Id</div>
            <div className="property-value">{data?.gene_id}</div>
          </li>
          <li>
            <div className="property-name">Gene Symbol</div>
            <div className="property-value">{data?.gene_symbol}</div>
          </li>
          <li>
            <div className="property-name">
              <span>Sequence</span>
              <div className="float-right pr-1">
                <Tooltip label={tooltipLabel}>
                  <ActionIcon onClick={() => copyToClipboard(data?.sequence)} size="sm">
                    <IconCopy size={15} />
                  </ActionIcon>
                </Tooltip>
              </div>
            </div>
            <div className="property-value whitespace-nowrap overflow-hidden overflow-ellipsis">
              {data?.sequence}
            </div>
          </li>
          <li>
            <div className="property-name">
              <span>Definition Line</span>
              <div className="float-right pr-1">
                <Tooltip label={tooltipLabel}>
                  <ActionIcon onClick={() => copyToClipboard(data?.definition_line)} size="sm">
                    <IconCopy size={15} />
                  </ActionIcon>
                </Tooltip>
              </div>
            </div>
            <div className="property-value">{data?.definition_line}</div>
          </li>
        </ul>
      </div>
    </PModalDialog>   
  );
});

export default ModalTranscriptDetails;
