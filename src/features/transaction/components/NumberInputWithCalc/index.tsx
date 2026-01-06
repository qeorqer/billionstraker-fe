import { ActionIcon, Flex, TextInput, Tooltip, Text } from '@mantine/core';
import { FC, useEffect, useRef, useState } from 'react';
import { FieldProps } from 'formik';
import {
  IconCalculator,
  IconPlus,
  IconMinus,
  IconX,
  IconDivide,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mantine/hooks';
import {
  evaluateExpression,
  isExpressionValid,
  normalizeExpression,
  shouldShowPreview,
} from 'features/transaction/components/NumberInputWithCalc/utils';

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
  const [isCalcOpened, setIsCalcOpened] = useState(false);

  const isMobileDevice = useMediaQuery('(max-width: 767px)');

  const flexRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getRightSectionContent = () => {
    if (shouldShowPreview(expression)) {
      return <Text px={4}>{`= ${field.value}`}</Text>;
    } else if (!isMobileDevice) {
      return (
        <Tooltip
          label={t('Expressions are supported')}
          multiline
          withArrow
          w={{ base: 220, sm: undefined }}
          events={{ hover: true, focus: true, touch: true }}>
          <IconCalculator
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </Tooltip>
      );
    }

    return null;
  };

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
        flexRef.current &&
        !flexRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsCalcOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <TextInput
        {...field}
        ref={inputRef}
        value={expression}
        inputMode="numeric"
        size="md"
        label={label}
        rightSection={getRightSectionContent()}
        rightSectionPointerEvents={
          shouldShowPreview(expression) ? 'none' : 'auto'
        }
        rightSectionWidth="auto"
        onChange={(event) => handleValueChange(event.currentTarget.value)}
        placeholder={placeholder}
        error={error}
        onFocus={() => setIsCalcOpened(true)}
      />
      {isMobileDevice && isCalcOpened && (
        <Flex
          ref={flexRef}
          justify="space-between"
          align="center"
          gap="xs"
          pos="fixed"
          bottom={0}
          left={0}
          w="100%"
          bg="dark.7"
          px="10px"
          h="60px"
          style={{
            borderTop: '1px solid var(--mantine-color-dark-4)',
            zIndex: 1,
          }}>
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
      )}
    </>
  );
};

export default NumberInputWithCalc;
