import React from 'react';

import { Col, Row } from '../../../tedi/components/layout/grid';

interface Color {
  name: string;
  value: string;
  main?: boolean;
}

interface GroupedColors {
  [groupName: string]: Color[];
}

interface ColorStoryProps {
  data: { mode: { name: string; id: string }; color: Color[] }[];
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
          <Row>
            <Col>
              <h3 className="text-capitalize w-100">{groupName}</h3>
            </Col>
          </Row>
          <Row alignItems="start">
            {colors.map((color, index) => (
              <Col md="auto" key={`${groupName}-${index}`}>
                <div className="color-card" style={{ backgroundColor: color.value }}></div>
                <p style={{ marginBottom: 0 }}>
                  <strong>--{color.name}</strong>
                </p>
                <p style={{ marginTop: 0 }}>{color.main && <code>Main</code>}</p>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
};

export default ColorStory;
