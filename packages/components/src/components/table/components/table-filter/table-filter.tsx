import { Column, Row as TableRow } from '@tanstack/react-table';
import cn from 'classnames';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useLabels } from '../../../../providers/label-provider';
import Button from '../../../button/button';
import { Card, CardContent } from '../../../card';
import Select, { ISelectOption } from '../../../form/select/select';
import TextField from '../../../form/textfield/textfield';
import { Col, Row } from '../../../grid';
import Icon from '../../../icon/icon';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../../../tooltip';
import { VerticalSpacing } from '../../../vertical-spacing';
import styles from '../../table.module.scss';
import { DefaultTData } from '../../table.types';

export interface TableFilterProps<TData extends DefaultTData<TData>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<TData, any>;
  rows: TableRow<TData>[];
}

interface TableFilterFields {
  filter: string;
}

const initialValues: TableFilterFields = { filter: '' };

export function TableFilter<TData extends DefaultTData<TData>>(props: TableFilterProps<TData>): JSX.Element | null {
  const { column, rows } = props;
  const [open, setOpen] = React.useState(false);
  const { getLabel } = useLabels();

  const validationSchema: Yup.SchemaOf<TableFilterFields> = Yup.object().shape({
    filter: Yup.string()
      .matches(/^(?!\s+$).*/, getLabel('table.no-spaces'))
      .when([], {
        is: () => column?.columnDef?.meta?.filterType === 'text',
        then: Yup.string().min(3, getLabel('table.min-length')),
        otherwise: Yup.string(),
      })
      .required(getLabel('required')),
  });

  const { values, setFieldValue, handleReset, handleSubmit, touched, errors } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values: TableFilterFields) => {
      if (!values.filter) return;
      column.setFilterValue(values.filter);
      setOpen(false);
    },
    onReset: () => {
      column.setFilterValue('');
      setOpen(false);
    },
  });

  React.useEffect(() => {
    if (open && !values.filter) {
      const filterField = document.getElementById(`filter-${column.id}`);
      filterField?.focus?.({ preventScroll: true });
    }
  }, [column.id, values.filter, open]);

  // TODO Show other filters if input is date for example
  const renderInput = (): JSX.Element => {
    const id = `filter-${column.id}`;
    const label = getLabel('table.filter');
    const placeholder = getLabel('search');

    const inputType = column.columnDef.meta?.filterType;
    const isSelect = inputType === 'select';

    if (isSelect) {
      const columnIDArray = Object.keys(rows?.map((i) => i?.original)?.[0]);
      if (!columnIDArray?.includes(column?.columnDef?.id || '')) {
        console.error(
          `Violating id: ${column?.columnDef?.id}
          Select filters use the column id to get the data,
          - change the id correspondingly,
          - make additions to the logic,
          - or use a custom filter TODO`
        );
      }

      const rowValues = rows
        // Get all values for the corresponding column id
        ?.map((i) => (column?.columnDef?.id ? i?.original?.[column?.columnDef?.id] : undefined))
        // Filter out undefined values
        ?.filter(Boolean)
        // Filter out non-unique values
        ?.filter((item, index, array) => array?.indexOf(item) === index)
        // Basic sort for strings and numbers
        ?.sort((a, b) => {
          if (typeof a === 'number') {
            return a - b;
          } else if (typeof a === 'string') {
            return a?.localeCompare?.(b);
          } else {
            return 0;
          }
        });
      const options: ISelectOption[] = rowValues?.map((i) => ({ label: String(i), value: String(i) }));

      return (
        <Select
          id={id}
          label={label}
          placeholder={placeholder}
          value={{ label: String(values.filter), value: String(values.filter) }}
          isSearchable={false}
          closeMenuOnSelect={true}
          options={options}
          onChange={(item) => setFieldValue('filter', (item as any)?.value)}
          helper={touched.filter && errors.filter ? { text: errors.filter, type: 'error' } : { text: '' }}
        />
      );
    }
    // else if(isMultiSelect){
    // TODO
    // }

    return (
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        icon="close"
        onIconClick={handleReset}
        value={values.filter}
        onChange={(value) => setFieldValue('filter', value)}
        helper={
          touched.filter && errors.filter
            ? { text: errors.filter, type: 'error' }
            : { text: getLabel('table.min-length') }
        }
      />
    );
  };

  return (
    <Col width="auto">
      <TooltipProvider openWith="click" open={open} onToggle={setOpen}>
        <TooltipTrigger>
          <div>
            <Icon
              className={cn(styles['filter-icon'], { [styles['filter-icon--active']]: !!values.filter || open })}
              name="filter_alt"
            />
          </div>
        </TooltipTrigger>
        <Tooltip>
          <Card type="borderless">
            <CardContent padding="xsmall">
              <form onSubmit={handleSubmit}>
                <VerticalSpacing>
                  {renderInput()}
                  <Row gutter={2}>
                    <Col width="auto">
                      <Button visualType="secondary" onClick={handleReset} fullWidth>
                        {getLabel('cancel')}
                      </Button>
                    </Col>
                    <Col width="auto">
                      <Button type="submit" fullWidth>
                        {getLabel('table.filter')}
                      </Button>
                    </Col>
                  </Row>
                </VerticalSpacing>
              </form>
            </CardContent>
          </Card>
        </Tooltip>
      </TooltipProvider>
    </Col>
  );
}

export default TableFilter;
