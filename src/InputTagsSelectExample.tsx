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

  function onRemoveTag(index: number, e: React.SyntheticEvent<HTMLElement>) {
    e.stopPropagation();
    const newTags = tags.filter((_, i) => i !== index);
    setTags(tags.filter((_, i) => i !== index));
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

  function onBlurValue() {
    setValueInput('');
  }

  const tagsFilter = tagsSelect.filter((tag) => {
    return tag.toLowerCase().includes(valueInput.toLowerCase()) && !tags.includes(tag);
  });

  const searchMessageId = useId();

  return (
    <>
      <h2>
        <label htmlFor='secondary-social-medias'>
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
            <InputTags.Tag key={i} theme='primary'>
              <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
              <InputTags.Tag.Close onClick={e => onRemoveTag(i, e)} />
            </InputTags.Tag>
          ))}
          <InputTags.Value
            ref={selectTriggerRef}
            value={valueInput}
            onChange={onChangeValue}
            id='secondary-social-medias'
            placeholder='Select keywords'
            onBlur={onBlurValue}
            aria-describedby={valueInput ? 'search-result' : undefined}
          />
        </Select.Trigger>
        <Select.Menu>
          {tagsFilter.map((tag, i) => (
            <Select.Option value={tag} key={i}>
              {tag}
            </Select.Option>
          ))}
          {valueInput !== '' && (
            <SearchMessage
              id={searchMessageId}
              value={tagsFilter.length}
            />
          )}
        </Select.Menu>
      </Select>
    </>
  );
};

export default InputTagsSelectExample;
