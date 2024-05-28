import React from 'react';

interface Color {
  name: string;
  color: string;
  main?: boolean;
}

interface GroupedColors {
  [groupName: string]: Color[];
}

interface ColorStoryProps {
  data: Color[];
}

const ColorStory: React.FC<ColorStoryProps> = ({ data }) => {
  const groupedColors: GroupedColors = data.reduce((acc: GroupedColors, item) => {
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
              <h3 className="text-capitalize w-100">{groupName}</h3>
            </div>
          </div>
          <div className="row" style={{ display: 'flex' }}>
            {colors.map((color, index) => (
              <div className="column" style={{ width: '12%' }} key={`${groupName}-${index}`}>
                <div className="color-card" style={{ backgroundColor: color.color }}></div>
                <p style={{ marginBottom: 0 }}>
                  <strong>--{color.name}</strong>
                </p>
                <p style={{ marginTop: 0 }}>{color.main && <code>Main</code>}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ColorStory;
