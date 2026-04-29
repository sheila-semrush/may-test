import Trash from '@semcore/icon/Trash/m';
import { Flex } from '@semcore/base-components';
import { ButtonTrigger } from '@semcore/base-trigger';
import Button from '@semcore/button';
import DropdownMenu from '@semcore/dropdown-menu';
import { InputSearch } from '@semcore/select';
import React, { useId, useState } from 'react';
import SearchMessage from './SearchMessage';

type Item = {
  title: string;
  description: string;
};

const initialMenuData = [
  {
    title: 'William Shakespeare',
    subtitle: 'English playwright and poet',
    items: [
      { title: 'Hamlet', description: 'Tragedy, 1623' },
      { title: 'King Lear', description: 'Tragedy, 1606' },
      { title: 'Romeo and Juliet', description: 'Tragedy, 1597' },
    ],
  },
  {
    title: 'Jane Austen',
    subtitle: 'English writer',
    items: [
      { title: 'Emma', description: 'Novel of manners, 1815' },
      { title: 'Pride and Prejudice', description: 'Novel of manners, 1813' },
      { title: 'Sense and Sensibility', description: 'Romance novel, 1811' },
    ],
  },
];

const Row = React.memo(({ style, data: { group, item, setProject, selectedProject, handleDelete } }: any) => (
  <div style={style}>
    <DropdownMenu.Item
      key={item.title}
      onClick={() => setProject(item.title)}
      selected={selectedProject === item.title}
    >
      <DropdownMenu inlineActions placement='right'>
        <Flex justifyContent='space-between'>
          <DropdownMenu.Item.Content tag={DropdownMenu.Trigger} h={20}>
            {item.title}
          </DropdownMenu.Item.Content>
          <DropdownMenu.Actions>
            <DropdownMenu.Item
              tag={Button}
              addonLeft={Trash}
              title='Delete'
              hintPlacement='right'
              onClick={e => handleDelete(e, group.title, item.title)}
            />
          </DropdownMenu.Actions>
        </Flex>
        <DropdownMenu.Item.Hint h={20}>
          {item.description}
        </DropdownMenu.Item.Hint>
      </DropdownMenu>
    </DropdownMenu.Item>
  </div>
));

const Demo = () => {
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [selectedProject, setProject] = useState<string | null>('Hamlet');
  const [menuData, setMenuData] = useState(initialMenuData);

  const filteredProjects = menuData.reduce<Item[]>((acc, { items }) => {
    items.forEach((item) => {
      if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        acc.push(item);
      }
    });

    return acc;
  }, []);

  const filterMessageId = useId();

  const handleDelete = (e: React.MouseEvent, groupTitle: string, itemTitle: string) => {
    e.stopPropagation();
    const newMenuData = menuData.map((group) => {
      if (group.title === groupTitle) {
        return {
          ...group,
          items: group.items.filter(item => item.title !== itemTitle),
        };
      }
      return group;
    });
    setMenuData(newMenuData);
  };

  return (
    <>
      <h2>Books menu</h2>
      <DropdownMenu
        selectable
        size='l'
        visible={visible}
        onVisibleChange={setVisible}
        highlightedIndex={highlightedIndex}
        onHighlightedIndexChange={setHighlightedIndex}
      >
        <DropdownMenu.Trigger tag={ButtonTrigger} w={220}>
          {selectedProject ?? 'Select book'}
        </DropdownMenu.Trigger>

        <DropdownMenu.Popper aria-label='Select book'>
          <InputSearch
            value={searchValue}
            onChange={setSearchValue}
            m={1}
            autoFocus={false}
            size='l'
            aria-describedby={searchValue ? filterMessageId : undefined}
          />

          {filteredProjects.length > 0 && (
            <DropdownMenu.List
              topOffset={68}
              shadowSize={5}
              shadowTheme={{ horizontalTop: 'dark', horizontalBottom: 'light' }}
              mb={1}
              hMax={316}
            >
              {menuData.map((group, index) => {
                if (group.items.some((item) => {
                  return item.title.toLowerCase().includes(searchValue.toLowerCase());
                }))
                  return (
                    <DropdownMenu.Group
                      key={index}
                      title={group.title}
                      subTitle={group.subtitle}
                      sticky
                    >
                      {group.items
                        .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .map(item => (
                          <Row
                            key={`${group.title}_${item.title}`}
                            data={{ group, item, setProject, selectedProject, handleDelete }}
                          />
                        ))}
                    </DropdownMenu.Group>
                  );
              })}
            </DropdownMenu.List>
          )}

          <SearchMessage
            id={filterMessageId}
            value={filteredProjects.length}
          />
        </DropdownMenu.Popper>
      </DropdownMenu>
    </>
  );
};

export default Demo;
