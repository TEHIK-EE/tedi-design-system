import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useLabels } from '../../../../../providers/label-provider';
import { IntentionalAny } from '../../../../../types';
import Button from '../../../../button/button';
import { DatePicker, DatepickerValue } from '../../../../form/pickers';
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
  const filterEndBeforeStart = getLabel('table.filter.validation.to-before-from');

  const validationSchema: Yup.Schema<typeof initialValues> = Yup.object().shape({
    dateField: Yup.object().shape({
      from: Yup.mixed<Exclude<DatepickerValue, null>>().defined().nullable(),
      to: Yup.mixed<Exclude<DatepickerValue, null>>()
        .defined()
        .nullable()
        .test('to-before-from', filterEndBeforeStart, function (value) {
          const { from } = this.parent;
          return !(value && from && dayjs(value).isBefore(dayjs(from), 'day'));
        }),
    }),
  });

  const { values, errors, setFieldValue, handleReset, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
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
          onChange={(value) => {
            setFieldValue('dateField.from', value);

            // if start date is after end date, then clear the end date
            if (value && values.dateField?.to && dayjs(value).isAfter(dayjs(values.dateField.to), 'day')) {
              setFieldValue('dateField.to', null);
            }
          }}
        />
        <DatePicker
          id={filterIdTo}
          label={filterLabelTo}
          name={filterLabelTo}
          value={values.dateField?.to}
          shouldDisableDate={(date) =>
            !!(values.dateField?.from && dayjs(date).isBefore(dayjs(values.dateField?.from, 'day')))
          }
          onChange={(value) => setFieldValue('dateField.to', value)}
          helper={
            (errors.dateField as IntentionalAny)?.to
              ? { text: (errors.dateField as IntentionalAny).to, type: 'error' }
              : undefined
          }
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
