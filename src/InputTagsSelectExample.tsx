import InputTags from '@semcore/input-tags';
import Select from '@semcore/select';
import React, { useId } from 'react';
import SearchMessage from './SearchMessage';

const tagsSelect = ['authors', 'books', 'libraries', 'novels'];

const InputTagsSelectExample = () => {
  const selectTriggerRef = React.useRef<HTMLInputElement>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [valueInput, setValueInput] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  function onRemoveLastTag() {
    if (tags.length) {
      setValueInput(tags[tags.length - 1]);
      setTags(tags.slice(0, -1));
    }
  }

  function onRemoveTag(tag: string, index: number, e: React.SyntheticEvent<HTMLElement>) {
    e.stopPropagation();
    const newTags = tags.filter(t => t !== tag);
    setTags(newTags);
    if (newTags.length === index) {
      selectTriggerRef.current?.focus();
    }
  }

  function onChangeValue(value: string) {
    setValueInput(value);
    setVisible(true);
  }

  function onChange(value: string[]) {
    setTags(value);
    setValueInput('');
  }

  const tagsFilter = tagsSelect.filter((tag) => {
    return tag.toLowerCase().includes(valueInput.toLowerCase()) && !tags.includes(tag);
  });

  const id = useId();

  return (
    <>
      <h2>
        <label htmlFor={`input-${id}`} id={`heading-${id}`}>
          Keywords
        </label>
      </h2>

      <Select
        interaction='focus'
        size='l'
        visible={visible && tags.length < 4}
        onVisibleChange={visible => setVisible(visible)}
        multiselect={true}
        value={tags}
        onChange={onChange}
      >
        <Select.Trigger
          tag={InputTags}
          w={300}
          size='l'
          onRemove={onRemoveLastTag}
        >
          {tags.map((tag, i) => (
            <InputTags.Tag key={tag} theme='primary'>
              <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
              <InputTags.Tag.Close onClick={e => onRemoveTag(tag, i, e)} />
            </InputTags.Tag>
          ))}
          <InputTags.Value
            ref={selectTriggerRef}
            value={valueInput}
            onChange={onChangeValue}
            id={`input-${id}`}
            placeholder='Select keywords'
            aria-describedby={valueInput ? `search-message-${id}` : undefined}
          />
        </Select.Trigger>
        <Select.Popper aria-labelledby={`heading-${id}`}>
          {tagsFilter.length > 0 && (
            <Select.List aria-labelledby={`heading-${id}`}>
              {tagsFilter.map(tag => (
                <Select.Option value={tag} key={tag}>
                  {tag}
                </Select.Option>
              ))}
            </Select.List>
          )}
          {valueInput !== '' && (
            <SearchMessage
              id={`search-message-${id}`}
              value={tagsFilter.length}
            />
          )}
        </Select.Popper>
      </Select>
    </>
  );
};

export default InputTagsSelectExample;
