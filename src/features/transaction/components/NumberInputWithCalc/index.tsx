import {
  ActionIcon,
  Flex,
  Popover,
  TextInput,
  Tooltip,
  Text,
} from '@mantine/core';
import { FC, useEffect, useRef, useState } from 'react';
import {
  evaluateExpression,
  isExpressionValid,
  normalizeExpression,
  shouldShowPreview,
} from 'features/transaction/components/NumberInputWithCalc/utils';
import { FieldProps } from 'formik';
import {
  IconCalculator,
  IconPlus,
  IconMinus,
  IconX,
  IconDivide,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

type NumberInputWithCalcProps = {
  label: string;
  placeholder: string;
  error: string | null;
  fieldObj: FieldProps;
  setValue: (value: number | '') => void;
};

const NumberInputWithCalc: FC<NumberInputWithCalcProps> = ({
  label,
  placeholder,
  error,
  fieldObj: { field },
  setValue,
}) => {
  const { t } = useTranslation();
  const [expression, setExpression] = useState('');
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (raw: string) => {
    if (raw === '') {
      setExpression(raw);
      setValue(raw);
      return;
    }

    if (!/^[0-9.+*/-]*$/.test(raw)) {
      return;
    }

    const value = normalizeExpression(expression, raw);

    if (!isExpressionValid(value)) {
      return;
    }

    setExpression(value);

    const result = evaluateExpression(value);
    if (result !== null) {
      setValue(result);
    }
  };

  useEffect(() => {
    if (field.value === '') {
      setExpression('');
    }
  }, [field.value]);

  useEffect(() => {
    if (field.value) {
      setExpression(String(field.value));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Popover
      position="top"
      withArrow
      shadow="md"
      width="target"
      offset={0}
      opened={isPopoverOpened}>
      <Popover.Target>
        <TextInput
          {...field}
          ref={inputRef}
          value={expression}
          inputMode="numeric"
          size="md"
          label={label}
          leftSection={
            <Tooltip
              label={t('Expressions are supported')}
              disabled={isPopoverOpened}
              multiline
              withArrow
              w={{ base: 220, sm: undefined }}
              events={{ hover: true, focus: true, touch: true }}>
              <ActionIcon
                variant="light"
                color="white"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsPopoverOpened((cur) => !cur);
                }}>
                <IconCalculator
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          }
          rightSection={
            shouldShowPreview(expression) ? (
              <Text px={4}>{`= ${field.value}`}</Text>
            ) : null
          }
          rightSectionPointerEvents="none"
          rightSectionWidth="auto"
          onChange={(event) => handleValueChange(event.currentTarget.value)}
          placeholder={placeholder}
          error={error}
        />
      </Popover.Target>
      <Popover.Dropdown p={0} ref={popoverRef}>
        <Flex justify="space-between" align="center" gap={'xs'}>
          <ActionIcon
            variant="light"
            color="white"
            w="100%"
            h={42}
            onClick={() => handleValueChange(`${expression}+`)}
            onMouseDown={(e) => e.preventDefault()}>
            <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="white"
            w="100%"
            h={42}
            onClick={() => handleValueChange(`${expression}-`)}
            onMouseDown={(e) => e.preventDefault()}>
            <IconMinus style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="white"
            w="100%"
            h={42}
            onClick={() => handleValueChange(`${expression}*`)}
            onMouseDown={(e) => e.preventDefault()}>
            <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="white"
            w="100%"
            h={42}
            onClick={() => handleValueChange(`${expression}/`)}
            onMouseDown={(e) => e.preventDefault()}>
            <IconDivide style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default NumberInputWithCalc;
