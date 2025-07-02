import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Link, TextField, VerticalSpacing } from '../../../../tedi';
import DirectionItem from './direction-item';
import { Directions } from './directions';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Map-Design-System?node-id=868-96921&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof Directions> = {
  component: Directions,
  title: 'Community/Map components/Directions',
  subcomponents: {
    'Direction.Item': Directions.Item,
  },
};

export default meta;
type Story = StoryObj<typeof Directions>;

const Template: StoryFn = () => {
  const [items, setItems] = useState<Array<{ id: string; element: React.ReactNode }>>([
    { id: '1', element: <TextField label="Teie asukoht" id="1" placeholder="Teie asukoht" hideLabel /> },
    { id: '2', element: <TextField label="Sihtpunkt" id="2" placeholder="Sihtpunkt" hideLabel /> },
  ]);

  const handleAddItem = () => {
    const newId = String(Date.now());
    setItems([
      ...items,
      {
        id: newId,
        element: <TextField label="Lisa punkt" id={newId} placeholder="Lisa punkt" hideLabel />,
      },
    ]);
  };

  return (
    <>
      <Directions onChange={setItems}>
        {items.map((item) => (
          <DirectionItem key={item.id} id={item.id}>
            {item.element}
          </DirectionItem>
        ))}
      </Directions>
      <Link onClick={handleAddItem} iconLeft="add">
        Lisa veel üks punkt
      </Link>
    </>
  );
};

export const Default: Story = {
  render: Template,
};

export const WithInitialItems: Story = {
  render: () => {
    const [items, setItems] = useState<Array<{ id: string; element: React.ReactNode }>>([
      { id: '1', element: <TextField label="Teie asukoht" id="1" placeholder="Teie asukoht" hideLabel /> },
      { id: '2', element: <TextField label="Sihtpunkt" id="2" placeholder="Sihtpunkt" hideLabel /> },
      { id: '3', element: <TextField label="Vahepunkt" id="3" placeholder="Vahepunkt" hideLabel /> },
    ]);

    return (
      <Directions onChange={setItems}>
        {items.map((item) => (
          <DirectionItem key={item.id} id={item.id}>
            {item.element}
          </DirectionItem>
        ))}
      </Directions>
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [items, setItems] = useState<{ id: string; element: React.ReactNode }[]>([]);
    const [counter, setCounter] = useState(1);

    const handleAddItem = () => {
      const newId = String(Date.now());
      setItems([
        ...items,
        {
          id: newId,
          element: <TextField label={`Punkt ${counter}`} id={newId} placeholder={`Punkt ${counter}`} hideLabel />,
        },
      ]);
      setCounter(counter + 1);
    };

    return (
      <VerticalSpacing>
        <Directions onChange={setItems}>
          {items.map((item) => (
            <DirectionItem key={item.id} id={item.id}>
              {item.element}
            </DirectionItem>
          ))}
        </Directions>
        <Link onClick={handleAddItem} iconLeft="add">
          {items.length === 0 ? 'Lisa esimene punkt' : 'Lisa veel üks punkt'}
        </Link>
      </VerticalSpacing>
    );
  },
};
