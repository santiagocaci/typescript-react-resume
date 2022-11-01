import { useEffect, useState } from 'react';

import type { MouseEvent } from 'react';
import type { SelectOption } from './types';

import styles from './select.module.css';

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(2);

  const clearOptions = (e: MouseEvent) => {
    e.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (e: MouseEvent, option: SelectOption) => {
    e.stopPropagation();
    setIsOpen(false);
    if (multiple) {
      value.includes(option)
        ? onChange(value.filter((op) => op !== option))
        : onChange([...value, option]);
    } else {
      if (value === option) return;
      onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) =>
    multiple ? value.includes(option) : value === option;

  // Css Logic
  const openOptions = () => (isOpen ? styles.show : '');

  const highlightSelected = (option: SelectOption) =>
    isOptionSelected(option) ? styles.selected : '';

  const styledHighlighted = (index: number) =>
    index === highlightedIndex ? styles.highlighted : '';

  useEffect(() => {
    if (!isOpen) return;
    setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((val) => (
              <button
                className={styles['option-badge']}
                onClick={(e) => selectOption(e, val)}
                key={val.value}
              >
                {val.label}
                <span className={styles['remove-btn']}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button onClick={(e) => clearOptions(e)} className={styles['close-btn']}>
        &times;
      </button>
      <div className={styles.divider} />
      <div className={styles.caret} />
      <ul
        onBlur={() => setHighlightedIndex(0)}
        className={`${styles.options} ${openOptions()}`}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            onClick={(e) => {
              selectOption(e, option);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={`${styles.option} ${highlightSelected(
              option
            )} ${styledHighlighted(index)}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
