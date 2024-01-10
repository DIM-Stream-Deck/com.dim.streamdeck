import {
  Accordion,
  Collapse,
  Divider,
  Fieldset,
  Group,
  Image,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useStreamDeck } from "../StreamDeck";
import { Droppable } from "../components/Droppable";
import {
  IconAccessible,
  IconHandClick,
  IconHandFinger,
  IconX,
} from "@tabler/icons-react";
import { DropText } from "../components/DropText";
import { PullItemSettings } from "@plugin/types";

export default () => {
  const { settings, setSettings, globalSettings, setGlobalSettings } =
    useStreamDeck<PullItemSettings>();

  if (!settings || !globalSettings) {
    return;
  }

  const gestures = [
    {
      label: "single press",
      key: "pullItemSinglePress",
    },
    {
      label: "double press",
      key: "pullItemDoublePress",
    },
    {
      label: "hold press",
      key: "pullItemHoldPress",
    },
  ] as const;

  return (
    <Stack gap="sm">
      <Droppable
        type="item"
        onSelect={(data) =>
          setSettings({ ...data, element: data.element ?? null })
        }
      >
        <Group gap="sm">
          {settings?.icon ? (
            <Image
              radius="md"
              width={64}
              height={64}
              draggable={false}
              src={`https://bungie.net${settings.icon}`}
            />
          ) : (
            <ThemeIcon variant="light" style={{ width: 64, height: 64 }}>
              <IconX />
            </ThemeIcon>
          )}
          <Stack gap={4} style={{ flex: 1 }}>
            {settings.label && (
              <Text
                fw="bold"
                c="white"
                size="sm"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: 160,
                }}
              >
                {settings.label}
              </Text>
            )}
            <DropText type="item" selected={Boolean(settings.label)} />
          </Stack>
        </Group>
      </Droppable>

      <Collapse in={!settings.isSubClass && !!settings.item}>
        <Accordion>
          <Accordion.Item value="gestures">
            <Accordion.Control icon={<IconHandClick />}>
              Gestures
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                {gestures.map((it, i) => (
                  <Fieldset legend={it.label}>
                    <SegmentedControl
                      fullWidth
                      color="dim"
                      size="sm"
                      data={["equip", "pull", "vault"]}
                      value={globalSettings[it.key]}
                      onChange={(action) => {
                        setGlobalSettings({
                          [it.key]: action,
                        });
                      }}
                    />
                    {i === 0 && (
                      <>
                        <Divider my="xs" />
                        <Group mt="xs" wrap="nowrap">
                          <Switch
                            checked={globalSettings.pullItemSingleToggle}
                            onChange={(e) =>
                              setGlobalSettings({
                                pullItemSingleToggle: e.currentTarget.checked,
                              })
                            }
                          />
                          <Text c="dimmed" size="sm">
                            if the item is already equipped send it to the{" "}
                            <strong>vault</strong>
                          </Text>
                        </Group>
                      </>
                    )}
                  </Fieldset>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="accessibility">
            <Accordion.Control icon={<IconAccessible />}>
              Accessibility
            </Accordion.Control>
            <Accordion.Panel>
              <Switch
                mt="sm"
                label="Grayscale filter for not-equipped items"
                checked={globalSettings.equipmentGrayscale ?? true}
                onChange={(e) =>
                  setGlobalSettings({
                    equipmentGrayscale: e.currentTarget.checked,
                  })
                }
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Collapse>
    </Stack>
  );
};
