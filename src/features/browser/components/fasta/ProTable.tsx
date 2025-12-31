import React from "react";
import {
  Card,
  Text,
  Group,
  Stack,
  ActionIcon,
  Menu,
  Divider,
  SegmentedControl,
  Box,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDotsVertical, IconEye, IconDownload } from "@tabler/icons-react";
import { FastaListItem } from '@/api/types/fasta';


export interface IProps {
  data: FastaListItem[];
  forAllSamples: boolean;
   onView?: (row: FastaListItem) => void;
   onDownload?: (row: FastaListItem) => void;
}

function formatInt(n?: number | null) {
  return n == null ? "—" : n.toLocaleString();
}

export function ProTable({
  data,
  forAllSamples,
  onView,
  onDownload
}: IProps) {
  const stickyHeader = true
  const showDensityToggle = true
  const isMobile = useMediaQuery("(max-width: 48em)"); // ~768px
  const isTablet = useMediaQuery("(max-width: 62em)"); // ~992px (hide long text column)
  const [density, setDensity] = React.useState<"compact" | "comfortable">(
    "comfortable"
  );

  const pad = density === "compact" ? "xs" : "sm";

  // Desktop grid:
  // - On tablet widths, drop DefinitionLine column to keep it tidy
  const desktopGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isTablet
      ? "1.4fr 1fr 0.9fr 0.7fr auto" // no definition
      : "1.3fr 1fr 0.9fr 0.7fr 2.4fr auto",
    gap: 12,
    alignItems: "center",
  };

  const headerStyle: React.CSSProperties = stickyHeader
    ? { position: "sticky", top: 0, zIndex: 2 }
    : {};

  return (
    <Stack gap="sm">
      {showDensityToggle && (
        <Group justify="flex-end">
          <SegmentedControl
            value={density}
            onChange={(v) => setDensity(v as any)}
            data={[
              { label: "Comfortable", value: "comfortable" },
              { label: "Compact", value: "compact" },
            ]}
          />
        </Group>
      )}

      {/* Header row (desktop only) */}
      {!isMobile && (
        <Card withBorder radius="md" padding={pad} style={headerStyle}>
          <div style={{ ...desktopGridStyle }}>
            <Text size="xs" c="dimmed" fw={600}>
              Sample
            </Text>
            <Text size="xs" c="dimmed" fw={600}>
              SMID
            </Text>
            <Text size="xs" c="dimmed" fw={600}>
              Fragments
            </Text>
            <Text size="xs" c="dimmed" fw={600}>
              Read #
            </Text>

            {!isTablet && (
              <Text size="xs" c="dimmed" fw={600}>
                Definition
              </Text>
            )}

            <Text size="xs" c="dimmed" fw={600} ta="right">
              Actions
            </Text>
          </div>
        </Card>
      )}

      {data.map((r) => {
        const handleView = () => onView?.(r);

        return (
          <Card
            key={String(r.id)}
            withBorder
            radius="md"
            padding={pad}
            // subtle “row hover” feel
            style={{
              cursor: onView ? "pointer" : "default",
              transition: "transform 120ms ease, background-color 120ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor =
                "var(--mantine-color-gray-0)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
            }}
          >
            {!isMobile ? (
              // Desktop: table-like row
              <Box
                role={onView ? "button" : undefined}
                tabIndex={onView ? 0 : -1}
                onClick={onView ? handleView : undefined}
                onKeyDown={
                  onView
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleView();
                        }
                      }
                    : undefined
                }
                style={desktopGridStyle}
              >
                <Text fw={650}>{r.sampleName}</Text>
                <Text>{r.smid}</Text>
                <Text>{formatInt(r.numFragments)}</Text>
                <Text>{r.readNumber ?? "—"}</Text>

                {!isTablet && (
                  <Text c="dimmed" lineClamp={1}>
                    {r.definitionLine}
                  </Text>
                )}

                <Group justify="flex-end" gap={6} onClick={(e) => e.stopPropagation()}>
                  <Menu position="bottom-end" withinPortal>
                    <Menu.Target>
                      <ActionIcon variant="subtle" aria-label="Row actions">
                        <IconDotsVertical size={18} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEye size={16} />}
                        onClick={() => onView?.(r)}
                      >
                        View details
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconDownload size={16} />}
                        onClick={() => onDownload?.(r)}
                      >
                        Download
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Box>
            ) : (
              // Mobile: stacked record card
              <Stack gap={6}>
                <Group justify="space-between" align="flex-start">
                  <Stack gap={2}>
                    <Text fw={700}>{r.sampleName}</Text>
                    <Text size="sm" c="dimmed">
                      {r.smid}
                    </Text>
                  </Stack>

                  <Menu position="bottom-end" withinPortal>
                    <Menu.Target>
                      <ActionIcon variant="light" aria-label="Row actions">
                        <IconDotsVertical size={18} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEye size={16} />}
                        onClick={() => onView?.(r)}
                      >
                        View details
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconDownload size={16} />}
                        onClick={() => onDownload?.(r)}
                      >
                        Download
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>

                <Divider />

                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Fragments
                  </Text>
                  <Text size="sm">{formatInt(r.numFragments)}</Text>
                </Group>

                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Read #
                  </Text>
                  <Text size="sm">{r.readNumber ?? "—"}</Text>
                </Group>

                <Text size="sm" c="dimmed" lineClamp={2}>
                  {r.definitionLine}
                </Text>

                {onView && (
                  <Group justify="flex-end" mt={4}>
                    <ActionIcon
                      variant="subtle"
                      aria-label="View"
                      onClick={() => onView(r)}
                    >
                      <IconEye size={18} />
                    </ActionIcon>
                  </Group>
                )}
              </Stack>
            )}
          </Card>
        );
      })}
    </Stack>
  );
}
