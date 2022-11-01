import { useState } from 'react';
import { Select } from './Select';
import type { SelectOption } from './types';

const options: SelectOption[] = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fifth', value: 5 },
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  return (
    <>
      <Select
        options={options}
        value={value}
        onChange={(valueChange) => setValue(valueChange)}
      />
    </>
  );
}

export default App;
