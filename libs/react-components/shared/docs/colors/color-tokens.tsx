import React from 'react';

import colorData from './base-color-variables.json';

interface Color {
  name: string;
  color: string;
}

interface GroupedColors {
  [groupName: string]: Color[];
}

const ColorStory: React.FC = () => {
  const groupedColors: GroupedColors = colorData.reduce((acc: GroupedColors, item) => {
    item.color.forEach((color: Color) => {
      const baseName = color.name.split('-')[0];
      if (!acc[baseName]) {
        acc[baseName] = [];
      }
      acc[baseName].push(color);
    });
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedColors).map(([groupName, colors]: [string, Color[]]) => (
        <div className="color__example__wrapper" key={groupName}>
          <div className="row">
            <div className="column">
              <h2 className="color__example__title" style={{ textTransform: 'capitalize' }}>
                {groupName}
              </h2>
            </div>
          </div>
          <div className="row" style={{ display: 'flex' }}>
            {colors.map((color: Color, index: number) => (
              <div className="column" style={{ width: '40%', padding: '0 8px' }} key={`${groupName}-${index}`}>
                <div className="color__example" style={{ backgroundColor: color.color }}></div>
                <p style={{ marginBottom: 0 }}>
                  <strong>--{color.name}</strong>
                </p>
                <p style={{ marginTop: 0 }}>
                  <code>{color.color}</code>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ColorStory;
