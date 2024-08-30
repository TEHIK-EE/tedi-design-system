import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { VerticalSpacing } from '../../../../../../../tedi/src/components/vertical-spacing';
import { useLabels } from '../../../../../providers/label-provider';
import { IntentionalAny } from '../../../../../types';
import Button from '../../../../button/button';
import { DatePicker, DatePickerProps } from '../../../../form/pickers';
import Col from '../../../../grid/col';
import Row from '../../../../grid/row';
import Text from '../../../../typography/text/text';
import { TableFilterContext } from '../table-filter-context';

// DatePicker props that we allow to override through the column.meta
export type PickerOverridableProps = Partial<
  Pick<
    DatePickerProps,
    | 'label'
    | 'minDate'
    | 'maxDate'
    | 'disableFuture'
    | 'disablePast'
    | 'shouldDisableDate'
    | 'shouldDisableMonth'
    | 'shouldDisableYear'
  >
>;

export const TableDateFilter = () => {
  const { getLabel } = useLabels();
  const { column, open, setOpen, values: contextValues } = React.useContext(TableFilterContext);

  const initialValues = {
    dateRangeField: contextValues?.dateRange,
  };

  const meta = column?.columnDef?.meta;
  const startFieldProps = meta?.startDatePicker ?? {};
  const endFieldProps = meta?.endDatePicker ?? {};

  const filterLabel = getLabel('table.filter');
  const filterLabelFrom = getLabel('table.filter.from');
  const filterLabelTo = getLabel('table.filter.to');
  const filterIdFrom = `filter-date-${column?.id}-from`;
  const filterIdTo = `filter-date-${column?.id}-to`;
  const filterEndBeforeStart = getLabel('table.filter.validation.to-before-from');

  const validationSchema: Yup.Schema<typeof initialValues> = Yup.object().shape({
    dateRangeField: Yup.object().shape({
      from: Yup.string().defined().nullable(),
      to: Yup.string()
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
      column?.setFilterValue(values.dateRangeField);
      setOpen?.(false);
    },
    onReset: () => {
      column?.setFilterValue('');
      setOpen?.(false);
    },
  });

  React.useEffect(() => {
    if (open && !values.dateRangeField) {
      const filterField = document.getElementById(filterIdFrom);
      filterField?.focus?.({ preventScroll: true });
    }
  }, [column?.id, values.dateRangeField, open, filterIdFrom]);

  return (
    <form onSubmit={handleSubmit}>
      <VerticalSpacing>
        <Text modifiers="h5">{filterLabel}</Text>
        <DatePicker
          id={filterIdFrom}
          label={filterLabelFrom}
          {...startFieldProps}
          name={filterLabelFrom}
          value={values.dateRangeField?.from ? dayjs(values.dateRangeField.from) : null}
          input={{
            autoComplete: 'off',
          }}
          onChange={(value) => {
            setFieldValue('dateRangeField.from', value?.toISOString() ?? null);

            // if start date is after end date, then clear the end date
            if (value && values.dateRangeField?.to && dayjs(value).isAfter(dayjs(values.dateRangeField?.to), 'day')) {
              setFieldValue('dateRangeField.to', null);
            }
          }}
        />
        <DatePicker
          id={filterIdTo}
          label={filterLabelTo}
          shouldDisableDate={(date) =>
            !!(values.dateRangeField?.from && dayjs(date).isBefore(dayjs(values.dateRangeField?.from), 'day'))
          }
          {...endFieldProps}
          name={filterLabelTo}
          value={values.dateRangeField?.to ? dayjs(values.dateRangeField?.to) : null}
          input={{
            autoComplete: 'off',
          }}
          onChange={(value) => setFieldValue('dateRangeField.to', value?.toISOString() ?? null)}
          helper={
            (errors.dateRangeField as IntentionalAny)?.to
              ? { text: (errors.dateRangeField as IntentionalAny).to, type: 'error' }
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
