import { ScreenReaderOnly } from '@semcore/base-components';
import { Text } from '@semcore/typography';

type SearchMessageProps = {
  value: number;
  id: string;
};

const SearchMessage = ({ value, id }: SearchMessageProps) => {
  return value
    ? (
        <ScreenReaderOnly
          id={id}
          aria-hidden='true'
        >
          {value}
          {value > 1 ? ' results ' : ' result '}
          found
        </ScreenReaderOnly>
      )
    : (
        <Text
          tag='div'
          id={id}
          key='Nothing'
          px={3}
          py={3}
          size={300}
          use='secondary'
        >
          Nothing found
        </Text>
      );
};

export default SearchMessage;
