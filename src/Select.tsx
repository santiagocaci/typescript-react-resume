import { useEffect, useState } from 'react';

import type { MouseEvent } from 'react';
import type { SelectOption } from './types';

import styles from './select.module.css';

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(2);

  const clearOptions = (e: MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  const selectOption = (e: MouseEvent, op: SelectOption) => {
    e.stopPropagation();
    setIsOpen(false);
    if (op === value) return;
    onChange(op);
  };

  const isOptionSelected = (option: SelectOption) => value === option;

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
      <span className={styles.value}>{value?.label}</span>
      <button onClick={(e) => clearOptions(e)} className={styles['close-btn']}>
        &times;
      </button>
      <div className={styles.divider} />
      <div className={styles.caret} />
      <ul className={`${styles.options} ${openOptions()}`}>
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
