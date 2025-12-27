import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconCopy, IconDna } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useClipboard, useTimeout } from '@mantine/hooks';
import { IFasta } from '@/assets/interfaces/_index';
import { readNumberList, strandDiscriminatorList, strandList } from '@/assets/lookupLists/_index';
import { DisplayEnumListItem, PModalDialog } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';

export interface IProps {}

export interface IHandles {
  open: (id: number) => void;
}

const ModalFastaDetails = forwardRef<IHandles, IProps>((_props, ref) => {
  const db = useDatabase();
  const clipboard = useClipboard();
  const [opened, setOpened] = useState<boolean>(false);
  const [tooltipLabel, setTooltipLabel] = useState<string>('Copy value to clipboard');
  const [data, setData] = useState<IFasta | null>(null);
  const { start } = useTimeout(() => setTooltipLabel('Copy value to clipboard'), 500);
  
  useImperativeHandle(ref, () => ({
    open(id: number) {
      getData(id);
      setOpened(true);
    },
  }));

  const getData = (id: number) => {
    db.httpGet<IFasta>(`fastas/${id}`, true).then((response) => {
      if (response.success) {
        if (response.data) {
          setData(response.data);
        }
      } else if (response.error?.status === 404) {
        notifications.show({
          color: 'red',
          title: 'Error: 404 - Fasta not found',
          message:
            'A Fasta with the provided Id could not be found. Returning you to the Fasta Browser',
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
      title="Fasta Details"
      opened={opened}
      onClose={() => setOpened(false)}
      size="xl"
      icon={<IconDna size={21} />}
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
            <div className="property-name">SMID</div>
            <div className="property-value">{data?.smid}</div>
          </li>
          <li>
            <div className="property-name">Mate Pair</div>
            <div className="property-value">{data?.mate_pair}</div>
          </li>
          <li>
            <div className="property-name">Sequence Id</div>
            <div className="property-value">{data?.seq_id}</div>
          </li>
          <li>
            <div className="property-name">Read Number</div>
            <div className="property-value">
              <DisplayEnumListItem list={readNumberList} value={data?.read_number} />
            </div>
          </li>
          <li>
            <div className="property-name">Fragment Number</div>
            <div className="property-value">{data?.num_fragments}</div>
          </li>
          <li>
            <div className="property-name">Strand</div>
            <div className="property-value">
              <DisplayEnumListItem list={strandList} value={data?.strand} />
            </div>
          </li>
          <li>
            <div className="property-name">Strand Discriminator</div>
            <div className="property-value">
              <DisplayEnumListItem
                list={strandDiscriminatorList}
                value={data?.strand_discriminator}
              />
            </div>
          </li>
          <li>
            <div className="property-name">Fragment Start</div>
            <div className="property-value">{data?.frag_start_array}</div>
          </li>
          <li>
            <div className="property-name">Fragment Length</div>
            <div className="property-value">{data?.frag_len_array}</div>
          </li>
          <li>
            <div className="property-name">Chunk</div>
            <div className="property-value">{data?.chunk}</div>
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
          <li>
            <div className="property-name">Comment</div>
            <div className="property-value">{data?.comment}</div>
          </li>
        </ul>
      </div>
    </PModalDialog>        
  );
});

export default ModalFastaDetails;