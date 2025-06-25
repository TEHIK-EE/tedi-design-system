import classNames from 'classnames';
import { UnknownType } from 'libs/react-components/src/tedi/types/commonTypes';
import React, { useEffect, useState } from 'react';

import { Button, Checkbox, CheckboxProps, SelectProps, Text } from '../../../../tedi';
import Select from '../select/select';
import styles from './layer-filter-panel.module.scss';

type BaseLayerOption = {
  /**
   * Unique identifier used as the `id` for the input element.
   */
  id: string;
  /**
   * Text label displayed next to the checkbox or select component.
   */
  label: string;
  /**
   * Optional nested layer options, used to build a tree-like structure.
   */
  children?: LayerOption[];
};

export type CheckboxLayerOption = BaseLayerOption &
  Omit<CheckboxProps, 'id' | 'label' | 'children'> & {
    type: 'checkbox';
  };

export type SelectLayerOption = BaseLayerOption &
  Omit<SelectProps, 'id' | 'label' | 'children'> & {
    type: 'select';
  };

export type LabelLayerOption = BaseLayerOption & {
  type: 'label';
};

export type LayerOption = CheckboxLayerOption | SelectLayerOption | LabelLayerOption;

type LayerFilterPanelProps = {
  /**
   * List of layer options to display, which can be nested to form a hierarchy.
   */
  items: LayerOption[];
  /**
   * Optional label text for the "Select All" master checkbox.
   */
  selectAllLabel?: string;
};

const LayerFilterPanel: React.FC<LayerFilterPanelProps> = ({ items, selectAllLabel = 'Kõik kihid' }) => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [selectValues, setSelectValues] = useState<Record<string, UnknownType>>({});
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    const initialChecks: Record<string, boolean> = {};
    const initialSelects: Record<string, UnknownType> = {};
    const walk = (nodes: LayerOption[]) => {
      for (const item of nodes) {
        if (item.type === 'checkbox') {
          initialChecks[item.id] = item.defaultChecked ?? false;
        }
        if (item.type === 'select' && item.defaultValue) {
          initialSelects[item.id] = item.defaultValue;
        }
        if (item.children) walk(item.children);
      }
    };
    walk(items);
    setCheckedState(initialChecks);
    setSelectValues(initialSelects);
  }, [items]);

  useEffect(() => {
    const values = Object.values(checkedState);
    const total = values.length;
    const checkedCount = values.filter(Boolean).length;
    setIndeterminate(checkedCount > 0 && checkedCount < total);
  }, [checkedState]);

  const handleCheck = (id: string, checked: boolean) => {
    setCheckedState((prev) => ({ ...prev, [id]: checked }));
    if (!checked) {
      const findAndClear = (nodes: LayerOption[]) => {
        for (const node of nodes) {
          if (node.id === id && node.children) {
            for (const child of node.children) {
              if (child.type === 'select') {
                setSelectValues((prev) => ({ ...prev, [child.id]: undefined }));
              }
              if (child.type === 'checkbox') {
                setCheckedState((prev) => ({ ...prev, [child.id]: false }));
              }
              if (child.children) findAndClear([child]);
            }
          } else if (node.children) {
            findAndClear(node.children);
          }
        }
      };
      findAndClear(items);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const allChecks: Record<string, boolean> = {};
    const walk = (nodes: LayerOption[]) => {
      for (const node of nodes) {
        if (node.type === 'checkbox') {
          allChecks[node.id] = checked;
        }
        if (node.children) walk(node.children);
      }
    };
    walk(items);
    setCheckedState(allChecks);

    if (!checked) {
      setSelectValues({});
    }
  };

  const renderItem = (item: LayerOption, level = 0) => {
    const isChecked = checkedState[item.id] ?? false;

    return (
      <div
        key={item.id}
        className={classNames(
          styles['tedi-layer-filter-panel__item'],
          styles[`tedi-layer-filter-panel__level-${level}`]
        )}
      >
        <div className={styles['tedi-layer-filter-panel__row']}>
          {item.type === 'checkbox' && (
            <Checkbox
              id={item.id}
              label={item.label}
              name={item.id}
              checked={isChecked}
              onChange={(_, checked) => handleCheck(item.id, checked)}
              value=""
            />
          )}
          {item.type === 'select' && (
            <Select
              id={item.id}
              label={item.label}
              options={item.options ?? []}
              value={selectValues[item.id]}
              onChange={(value) => setSelectValues((prev) => ({ ...prev, [item.id]: value }))}
            />
          )}
          {item.type === 'checkbox' && (
            <div className={styles['tedi-layer-filter-panel__actions']}>
              <Button visualType="link" icon="download">
                Download
              </Button>
              <Button visualType="link" icon="edit">
                Edit
              </Button>
              <Button visualType="link" icon="info">
                Info
              </Button>
              <Button visualType="link" icon="more_horiz">
                Show more actions
              </Button>
            </div>
          )}
        </div>

        {item.type === 'label' && (
          <div key={item.id} className={styles['tedi-layer-filter-panel__item']}>
            <div className={styles['tedi-layer-filter-panel__label']}>{item.label}</div>
            {item.children?.map((child) => renderItem(child, level + 1))}
          </div>
        )}
        {item.children?.map((child) => renderItem(child, level + 1))}
      </div>
    );
  };

  const hasCheckboxes = (nodes: LayerOption[]): boolean => {
    return nodes.some((item) =>
      item.type === 'checkbox' ? true : item.children ? hasCheckboxes(item.children) : false
    );
  };

  return (
    <div className={styles['tedi-layer-filter-panel']}>
      <div className={styles['tedi-layer-filter-panel__select-all']}>
        {hasCheckboxes(items) ? (
          <Checkbox
            id="select-all"
            label={selectAllLabel}
            name="select-all"
            value="all"
            checked={Object.values(checkedState).every(Boolean)}
            indeterminate={indeterminate}
            onChange={(_, checked) => handleSelectAll(checked)}
          />
        ) : (
          <Text color="primary" modifiers={['bold']}>
            {selectAllLabel}
          </Text>
        )}
      </div>
      <div
        className={classNames(
          styles['tedi-layer-filter-panel'],
          !hasCheckboxes(items) && styles['tedi-layer-filter-panel--no-checkboxes']
        )}
      >
        {items.map((item) => renderItem(item, 1))}
      </div>
    </div>
  );
};

export default LayerFilterPanel;
