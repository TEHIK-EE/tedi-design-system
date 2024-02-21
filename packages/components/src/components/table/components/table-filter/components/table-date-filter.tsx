import { useFormik } from 'formik';
import React from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import Button from '../../../../button/button';
import { DatePicker } from '../../../../form/pickers';
import Col from '../../../../grid/col';
import Row from '../../../../grid/row';
import Text from '../../../../typography/text/text';
import VerticalSpacing from '../../../../vertical-spacing/vertical-spacing';
import { TableFilterContext } from '../table-filter-context';

export const TableDateFilter = () => {
  const { getLabel } = useLabels();
  const { column, open, setOpen, values: contextValues } = React.useContext(TableFilterContext);
  const initialValues = { dateField: contextValues?.dateRange };

  const filterLabel = getLabel('table.filter');
  const filterLabelFrom = getLabel('table.filter.from');
  const filterLabelTo = getLabel('table.filter.to');
  const filterIdFrom = `filter-date-${column?.id}-from`;
  const filterIdTo = `filter-date-${column?.id}-to`;

  const { values, setFieldValue, handleReset, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values: typeof initialValues) => {
      column?.setFilterValue(values.dateField);
      setOpen?.(false);
    },
    onReset: () => {
      column?.setFilterValue('');
      setOpen?.(false);
    },
  });

  React.useEffect(() => {
    if (open && !values.dateField) {
      const filterField = document.getElementById(filterIdFrom);
      filterField?.focus?.({ preventScroll: true });
    }
  }, [column?.id, values.dateField, open, filterIdFrom]);

  return (
    <form onSubmit={handleSubmit}>
      <VerticalSpacing>
        <Text modifiers="h5">{filterLabel}</Text>
        <DatePicker
          id={filterIdFrom}
          label={filterLabelFrom}
          name={filterLabelFrom}
          value={values.dateField?.from}
          onChange={(value) => setFieldValue('dateField.from', value)}
        />
        <DatePicker
          id={filterIdTo}
          label={filterLabelTo}
          name={filterLabelTo}
          value={values.dateField?.to}
          onChange={(value) => setFieldValue('dateField.to', value)}
        />
        <Row gutter={2} justifyContent="end">
          <Col width="auto">
            <Button visualType="secondary" onClick={handleReset}>
              {getLabel('clear')}
            </Button>
          </Col>
          <Col width="auto">
            <Button type="submit">{getLabel('table.filter')}</Button>
          </Col>
        </Row>
      </VerticalSpacing>
    </form>
  );
};
