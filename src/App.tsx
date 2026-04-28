import { Flex } from '@semcore/base-components';
import './App.css';
import InputTagsSelectExample from './InputTagsSelectExample';
import CarouselExample from './CarouselExample';
import DropdownMenuExample from './DropdownMenuExample';
import SelectExample from './SelectExample';
import InputTagsValidation from './InputTagsValidation';
import DropdownMenuNested from './DropdownMenuNested';

const Demo = () => (
  <>
    <h1>Welcome to the testing page</h1>

    <Flex direction='column' alignItems='start' mb={10}>
      <DropdownMenuExample />
      <DropdownMenuNested />
      <SelectExample />
      <InputTagsValidation />
      <InputTagsSelectExample />
      <CarouselExample />
    </Flex>
  </>
);

export default Demo;
