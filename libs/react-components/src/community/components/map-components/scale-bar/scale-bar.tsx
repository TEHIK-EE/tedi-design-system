import React, { useEffect, useState } from 'react';

import styles from './scale-bar.module.scss';

interface ScaleBarProps {
  /**
   * The current zoom level of the map.
   * Determines the scale displayed on the scale bar (e.g., 100 m, 1 km, etc.).
   */
  zoomLevel: number;
}

const ScaleBar: React.FC<ScaleBarProps> = ({ zoomLevel }) => {
  const [scaleInfo, setScaleInfo] = useState({
    km: 0,
    widthPx: 100,
    ratio: 0,
    displayText: '0 km 1:0',
  });

  useEffect(() => {
    const DEFAULT_ZOOM = 0;
    const BASE_WIDTH_PX = 50;

    const zoomFactor = Math.pow(2, zoomLevel - DEFAULT_ZOOM);
    const dynamicWidthPx = Math.round(BASE_WIDTH_PX * zoomFactor);
    const metersPerPixel = 156543.03392 / Math.pow(2, zoomLevel);
    const distanceInMeters = metersPerPixel * dynamicWidthPx;
    const km = Math.round((distanceInMeters / 1000) * 10) / 10;
    const roundedRatio = Math.round(1 / (metersPerPixel / 100));

    let displayText;
    if (km < 1) {
      const meters = Math.round(distanceInMeters);
      displayText = `${meters} m 1:${roundedRatio.toLocaleString()}`;
    } else {
      displayText = `${km.toFixed(1)} km 1:${roundedRatio.toLocaleString()}`;
    }

    setScaleInfo({
      km,
      widthPx: dynamicWidthPx,
      ratio: roundedRatio,
      displayText,
    });
  }, [zoomLevel]);

  return (
    <div className={styles['tedi-scale-bar__wrapper']}>
      <div className={styles['tedi-scale-bar__indicator']} style={{ width: `${scaleInfo.widthPx}px` }} />
      <div className={styles['tedi-scale-bar__data']}>{scaleInfo.displayText}</div>
    </div>
  );
};

export default ScaleBar;
