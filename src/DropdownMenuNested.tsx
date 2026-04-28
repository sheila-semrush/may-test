import ChevronRightIcon from '@semcore/icon/ChevronRight/m';
import Button from '@semcore/button';
import DropdownMenu from '@semcore/dropdown-menu';
import { useRef, useState } from 'react';
import { Text } from '@semcore/typography';

const Demo = () => {
  const menuData = [
    {
      title: 'Edit',
      submenu: [
        'Cut',
        'Copy',
        'Paste',
      ],
    },
    {
      title: 'Export',
      submenu: [
        'As text',
        'As an image',
        'As PDF',
      ],
    },
  ];

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => {
      triggerRef.current?.focus();
      setMessage('Action successful!');
    }, 300);
    setTimeout(() => setMessage(''), 2000);
  };

  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <h2>File menu</h2>

      <div>
        <DropdownMenu
          size='l'
          visible={visible}
          onVisibleChange={setVisible}
        >
          <DropdownMenu.Trigger
            tag={Button}
            wMin={100}
            ref={triggerRef}
          >
            File
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu wMin={120}>
            {
              menuData.map(firstLevelItem => (
                <DropdownMenu.Item key={firstLevelItem.title}>
                  {!firstLevelItem.submenu && firstLevelItem.title}

                  {firstLevelItem.submenu && (
                    <DropdownMenu
                      size='l'
                      placement='right-start'
                      interaction={DropdownMenu.nestedMenuInteraction}
                      timeout={[0, 300]}
                      offset={[-11, 12]}
                    >
                      <DropdownMenu.Item.Content
                        tag={DropdownMenu.Trigger}
                      >
                        {firstLevelItem.title}
                        <DropdownMenu.Item.Addon
                          tag={ChevronRightIcon}
                          color='icon-secondary-neutral'
                        />
                      </DropdownMenu.Item.Content>
                      <DropdownMenu.Menu w={120}>
                        {
                          firstLevelItem.submenu.map(secondLevelItem => (
                            <DropdownMenu.Item onClick={handleClick} key={secondLevelItem}>
                              {secondLevelItem}
                            </DropdownMenu.Item>
                          ))
                        }
                      </DropdownMenu.Menu>
                    </DropdownMenu>
                  )}
                </DropdownMenu.Item>
              ))
            }
          </DropdownMenu.Menu>
        </DropdownMenu>
        <Text ml={4} color='text-success' aria-live='polite' role='status'>
          {message}
        </Text>
      </div>
    </>
  );
};

export default Demo;
