import { Flex } from '@semcore/base-components';
import Select from '@semcore/select';
import React, { useId } from 'react';
import SearchMessage from './SearchMessage';

const Demo = () => {
  const [filter, setFilter] = React.useState('');
  const options = React.useMemo(
    () =>
      data.filter((option) => {
        return option.value.toString().toLowerCase().includes(filter.toLowerCase());
      }),
    [filter],
  );

  const filterMessageId = useId();

  return (
    <Flex direction='column' alignItems='start' gap={2}>
      {/* <Text tag='label' size={200} htmlFor='options-filtering-select'>
      </Text> */}
      <h2>
        <label htmlFor='book-keywords-select'>
          Book keywords
        </label>
      </h2>
      <Select
        placeholder='Select keywords'
        size='l'
        multiselect
      >
        <Select.Trigger
          id='book-keywords-select'
          wMax='min(80vw, 400px)'
        />
        <Select.Popper aria-label='Book keywords'>
          <Select.InputSearch
            value={filter}
            onChange={setFilter}
            aria-describedby={filter ? filterMessageId : undefined}
          />
          {options.length > 0 && (
            <Select.List hMax='224px'>
              {options.map(({ value, label }) => (
                <Select.Option value={value} key={value}>
                  <Select.Option.Checkbox />
                  {label}
                </Select.Option>
              ))}
            </Select.List>
          )}
          <SearchMessage
            id={filterMessageId}
            value={options.length}
          />
        </Select.Popper>
      </Select>
    </Flex>
  );
};

const data = [
  'audio books',
  'book shops',
  'books',
  'classic books',
  'digital',
  'drama',
  'electronic',
  'kindle',
  'libraries',
  'novels',
  'reading',
  'writers',
].map(item => ({
  label: item,
  value: item,
}));

export default Demo;
