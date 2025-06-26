import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { Icon, Popover, PopoverContentProps, Text } from '../../../../tedi';
import styles from './timeline.module.scss';

type IntervalType = 'day' | 'week' | 'year';

interface TimelineProps {
  /**
   * The initial date where the timeline needle should be positioned.
   * This determines the starting point of the interactive timeline cursor.
   */
  initialDate: Date;
  /**
   * The minimum date (start) of the timeline range.
   * This defines the leftmost (or topmost in vertical mode) boundary of the timeline.
   * The timeline cannot scroll or select dates before this date.
   */
  minDate: Date;
  /**
   * The maximum date (end) of the timeline range.
   * This defines the rightmost (or bottommost in vertical mode) boundary of the timeline.
   * The timeline cannot scroll or select dates after this date.
   */
  maxDate: Date;
  /**
   * The time interval between ticks on the timeline.
   *
   * Options:
   * - "day": Shows daily intervals (24 hours)
   * - "week": Shows weekly intervals (7 days)
   * - "year": Shows yearly intervals (365 days)
   *
   * This affects both the density of minor ticks and the frequency of major labeled ticks.
   */
  interval: IntervalType;
  /**
   * Optional configuration for rendering additional content in a popover.
   * When provided, the clock component becomes clickable and shows this popover content.
   *
   * Structure:
   * - `children`: React node to render inside the popover
   * - `title`: Optional popover header text
   * - Other Popover component props as needed
   */
  popover?: PopoverContentProps;
  /**
   * Controls the orientation of the timeline.
   *
   * - When `false` (default): Renders horizontally with:
   *   - Ticks on bottom
   *   - Time flowing left-to-right
   *
   * - When `true`: Renders vertically with:
   *   - Ticks on left side
   *   - Time flowing top-to-bottom
   *   - Needle on right side
   */
  vertical?: boolean;
}

const getIntervalMs = (interval: IntervalType) => {
  switch (interval) {
    case 'day':
      return 24 * 60 * 60 * 1000;
    case 'week':
      return 7 * 24 * 60 * 60 * 1000;
    case 'year':
      return 365 * 24 * 60 * 60 * 1000;
    default:
      return 60 * 1000;
  }
};

export const Timeline: React.FC<TimelineProps> = ({
  initialDate,
  minDate,
  maxDate,
  interval = 'day',
  popover,
  vertical = false,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [barSize, setBarSize] = useState({ width: 0, height: 0 });
  const [needlePosition, setNeedlePosition] = useState(0);
  const [open, setOpen] = useState(false);

  const duration = maxDate.getTime() - minDate.getTime();
  const pixelPerMs = vertical ? barSize.height / duration : barSize.width / duration;

  const getPositionFromDate = (date: Date) => {
    return (date.getTime() - minDate.getTime()) * pixelPerMs;
  };

  useEffect(() => {
    if (barSize.width > 0 || barSize.height > 0) {
      const position = getPositionFromDate(initialDate);
      setNeedlePosition(position);
    }
  }, [barSize, initialDate]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setBarSize({ width: rect.width, height: rect.height });
    });

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const generateTicks = () => {
    const intervalMs = getIntervalMs(interval);
    const duration = maxDate.getTime() - minDate.getTime();
    const pixelPerMs = vertical ? barSize.height / duration : barSize.width / duration;

    const tinyTicks: number[] = [];
    const mainTicksWithLabels: { position: number; label: string }[] = [];

    let current = new Date(minDate.getTime());
    let tickIndex = 0;

    while (current <= maxDate) {
      const offset = (current.getTime() - minDate.getTime()) * pixelPerMs;

      tinyTicks.push(offset);

      if (tickIndex >= 1 && tickIndex % 10 === 0) {
        mainTicksWithLabels.push({
          position: offset,
          label: current.toLocaleString('et-EE', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
        });
      }

      current = new Date(current.getTime() + intervalMs);
      tickIndex++;
    }

    if (mainTicksWithLabels.length === 0 && tinyTicks.length > 0) {
      const lastTick = tinyTicks[tinyTicks.length - 1];
      mainTicksWithLabels.push({
        position: lastTick,
        label: maxDate.toLocaleString('et-EE', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      });
    }

    return { tinyTicks, mainTicksWithLabels };
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();

    // Calculate position based on orientation
    const position = vertical
      ? rect.height - (e.clientY - rect.top) // Invert Y-axis for vertical
      : e.clientX - rect.left;

    const maxPosition = vertical ? barSize.height : barSize.width;
    const clampedPosition = Math.max(0, Math.min(position, maxPosition));
    setNeedlePosition(clampedPosition);
  };

  const { tinyTicks, mainTicksWithLabels } = generateTicks();

  return (
    <div className={classNames(styles['tedi-timeline'], vertical && styles['tedi-timeline--vertical'])}>
      <Popover open={open} onToggle={() => setOpen(!open)}>
        <Popover.Trigger>
          <div className={classNames(styles['tedi-timeline__clock-wrapper'])}>
            <div className={styles['tedi-timeline__clock']}>
              <time className={styles['tedi-timeline__time']}>
                {initialDate.toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit' })}
              </time>
              <time className={styles['tedi-timeline__date']}>
                {initialDate.toLocaleDateString('et-EE', { day: '2-digit', month: 'long', year: 'numeric' })}
              </time>
            </div>
            <Icon name="expand_more" />
          </div>
        </Popover.Trigger>
        <Popover.Content {...popover}>{popover?.children}</Popover.Content>
      </Popover>

      <div className={classNames(styles['tedi-timeline__main-track'], vertical && styles['tedi-timeline--vertical'])}>
        <div
          className={classNames(styles['tedi-timeline__track-bar'], vertical && styles['tedi-timeline--vertical'])}
          ref={barRef}
          onClick={handleClick}
        >
          {tinyTicks.map((position, idx) => (
            <span
              key={`tiny-${idx}`}
              className={classNames(styles['tedi-timeline__tick--tiny'], vertical && styles['tedi-timeline--vertical'])}
              style={vertical ? { top: `${position}px` } : { left: `${position}px` }}
            />
          ))}

          {mainTicksWithLabels.map((tick, idx) => (
            <div
              key={`main-label-${idx}`}
              className={classNames(styles['tedi-timeline__tick-group'], vertical && styles['tedi-timeline--vertical'])}
              style={vertical ? { top: `${tick.position}px` } : { left: `${tick.position}px` }}
            >
              <span
                className={classNames(
                  styles['tedi-timeline__tick--large'],
                  vertical && styles['tedi-timeline--vertical']
                )}
              />
              <div
                className={classNames(
                  styles['tedi-timeline__tick-label'],
                  vertical && styles['tedi-timeline--vertical']
                )}
              >
                <Text modifiers={['small']} color="secondary">
                  {tick.label}
                </Text>
              </div>
            </div>
          ))}
        </div>

        <div className={classNames(styles['tedi-timeline__track'], vertical && styles['tedi-timeline--vertical'])}>
          <canvas
            className={classNames(styles['tedi-timeline__tracks'], vertical && styles['tedi-timeline--vertical'])}
            width={vertical ? 1 : barSize.width}
            height={vertical ? barSize.height : 1}
          ></canvas>
        </div>
        <div
          className={classNames(styles['tedi-timeline__needle'], vertical && styles['tedi-timeline--vertical'])}
          style={vertical ? { bottom: `${needlePosition}px` } : { left: `${needlePosition}px` }}
        >
          <div className={styles['tedi-timeline__needle-head']}>
            <Icon name="code" color="brand" size={12} />
          </div>
          <div
            className={classNames(styles['tedi-timeline__needle-line'], vertical && styles['tedi-timeline--vertical'])}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
