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
  index: number;
};

type Group = {
  title: string;
  subtitle: string;
  items: Item[];
};

const initialMenuData = [
  {
    title: 'William Shakespeare',
    subtitle: 'English playwright and poet',
    items: [
      { title: 'Hamlet', description: 'Tragedy, 1623', index: 0 },
      { title: 'King Lear', description: 'Tragedy, 1606', index: 1 },
      { title: 'Romeo and Juliet', description: 'Tragedy, 1597', index: 2 },
    ],
  },
  {
    title: 'Jane Austen',
    subtitle: 'English writer',
    items: [
      { title: 'Emma', description: 'Novel of manners, 1815', index: 3 },
      { title: 'Pride and Prejudice', description: 'Novel of manners, 1813', index: 4 },
      { title: 'Sense and Sensibility', description: 'Romance novel, 1811', index: 5 },
    ],
  },
];

const Row = React.memo(({ style, data: { group, item, setProject, selectedProject, handleDelete } }: any) => (
  <div style={style}>
    <DropdownMenu.Item
      key={item.title}
      onClick={() => setProject(item.title)}
      selected={selectedProject === item.title}
      index={item.index}
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
  const [filteredMenuData, setFilteredMenuData] = useState(initialMenuData);

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

  React.useEffect(() => {
    const newFilteredProjects: Group[] = [];
    let highlightedIndex = -1;

    menuData.forEach((group, i) => {
      group.items.forEach((item) => {
        if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
          if (!newFilteredProjects[i]) {
            newFilteredProjects[i] = {
              ...group,
              items: [],
            };
          }
          newFilteredProjects[i].items.push(item);

          if (item.title === selectedProject || highlightedIndex === -1) {
            highlightedIndex = item.index;
          }
        }
      });
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHighlightedIndex(highlightedIndex);
    setFilteredMenuData(newFilteredProjects);
  }, [menuData, searchValue, selectedProject]);

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

          {filteredMenuData.length > 0 && (
            <DropdownMenu.List
              topOffset={68}
              shadowSize={5}
              shadowTheme={{ horizontalTop: 'dark', horizontalBottom: 'light' }}
              mb={1}
              hMax={316}
            >
              {filteredMenuData.map((group, index) => {
                return (
                  <DropdownMenu.Group
                    key={index}
                    title={group.title}
                    subTitle={group.subtitle}
                    sticky
                  >
                    {group.items.map(item => (
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
            value={filteredMenuData.length}
          />
        </DropdownMenu.Popper>
      </DropdownMenu>
    </>
  );
};

export default Demo;
