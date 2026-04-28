import { Flex, ScreenReaderOnly } from '@semcore/base-components';
import Counter from '@semcore/counter';
import InputTags from '@semcore/input-tags';
import Tooltip from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import React, { useId } from 'react';
import { useForm, Controller } from 'react-hook-form';

const Demo = () => {
  const defaultValues = {
    emails: [
      'john@hotmail.com',
      'sally@gmail.com',
    ],
  };

  const {
    getValues,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const id = useId();

  const MAX_TAGS = 3;
  const invalidEmailMessage = 'This doesn\'t look like a valid email, please check your spelling.';
  const tooManyEmailsMessage = `There can be no more than ${MAX_TAGS} emails.`;

  const inputValueRef = React.useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const isEmailValid = (val: string) => /[a-z0-9-]+@.+\..+/i.test(val);

  const handleAppendTags = (newTags: string[]) => {
    const tags = getValues('emails');
    if (newTags.some(tag => !isEmailValid(tag))) {
      setError('emails', { message: invalidEmailMessage });
      return;
    }
    if (tags.length + newTags.length > MAX_TAGS) {
      setError('emails', { message: tooManyEmailsMessage });
      return;
    }
    setValue('emails', [...tags, ...newTags]);
    setInputValue('');
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError('emails', { message: invalidEmailMessage });
    }
    setIsFocused(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (!value || isEmailValid(value)) {
      clearErrors();
    }
  };

  const handleEditTag = (
    e: React.SyntheticEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    const tags = getValues('emails');
    if (inputValue) {
      tags.push(inputValue);
    }

    const { dataset } = e.currentTarget as any;
    setValue(
      'emails',
      tags.filter((_, idx) => idx !== Number(dataset.id)),
    );
    setInputValue(dataset.value);
    inputValueRef.current?.focus();
    return false;
  };

  const handleEditLastTag = () => {
    const tags = getValues('emails');
    if (tags.length === 0) return;
    setValue('emails', tags.slice(0, -1));
    setInputValue(tags[tags.length - 1]);
  };

  const handleRemoveTag = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const tags = getValues('emails');
    setValue(
      'emails',
      tags.filter((_, idx) => idx !== id),
    );
    inputValueRef.current?.focus();
  };

  const emailInvalid = Boolean(errors.emails);
  const showError = isFocused && emailInvalid;
  console.log(isFocused);

  return (
    <>
      <h2>Email notifications</h2>

      <Flex direction='column' alignItems='flex-start'>
        <Controller
          render={({ field: { value: tags = [] } }) => (
            <>
              <Flex>
                <Text size={300} tag='label' htmlFor={`${id}-emails`}>
                  Recipients
                </Text>
                <Counter
                  ml={2}
                  size='l'
                  theme={tags.length < MAX_TAGS ? '' : 'warning'}
                  id={`counter-${id}`}
                  style={{ verticalAlign: 'baseline' }}
                >
                  {`${tags.length}/${MAX_TAGS}`}
                  <ScreenReaderOnly>allowed emails</ScreenReaderOnly>
                </Counter>

              </Flex>
              <Tooltip
                interaction='none'
                theme='warning'
                w='100%'
                animationsDisabled
                timeout={0}
                visible={showError}
              >
                <Tooltip.Trigger
                  tag={InputTags}
                  size='l'
                  mt={2}
                  w='min(100%, 600px)'
                  state={emailInvalid ? 'invalid' : 'normal'}
                  onAppend={handleAppendTags}
                  onRemove={handleEditLastTag}
                >
                  {tags.map((tag, idx) => (
                    <InputTags.Tag
                      editable
                      key={idx}
                      data-id={idx}
                      data-value={tag}
                      onClick={handleEditTag}
                    >
                      <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                      <InputTags.Tag.Close onClick={handleRemoveTag(idx)} />
                    </InputTags.Tag>
                  ))}
                  <InputTags.Value
                    wMin={150}
                    id={`${id}-emails`}
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='Enter email'
                    value={inputValue}
                    ref={inputValueRef}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={() => setIsFocused(true)}
                    aria-invalid={emailInvalid}
                    aria-describedby={`counter-${id} ${showError ? 'form-emails-error' : ''}`}
                    __excludeProps={['aria-haspopup']}
                  />
                </Tooltip.Trigger>
                <Tooltip.Popper id='form-emails-error'>
                  {String((errors['emails'] as any)?.message)}
                </Tooltip.Popper>
              </Tooltip>
            </>
          )}
          control={control}
          name='emails'
        />
      </Flex>
    </>
  );
};

export default Demo;
