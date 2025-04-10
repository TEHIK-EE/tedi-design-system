import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { TextField } from '../../../../../../tedi/components/form/textfield/textfield';
import { Col, Row } from '../../../../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../../../../tedi/components/layout/vertical-spacing';
import { useLabels } from '../../../../../../tedi/providers/label-provider';
import Button from '../../../../button/button';
import { TableFilterContext } from '../table-filter-context';

export const TableTextFilter = () => {
  const { getLabel } = useLabels();
  const { column, open, setOpen, values: contextValues } = React.useContext(TableFilterContext);
  const initialValues = { filter: contextValues?.filter };

  const filterId = `text-filter-${column?.id}`;
  const filterLabel = getLabel('table.filter');
  const filterPlaceholder = getLabel('search');
  const filterMinLengthVal = getLabel('table.filter.validation.min-length');
  const filterMinLength = typeof filterMinLengthVal === 'string' ? filterMinLengthVal : filterMinLengthVal(3);

  const validationSchema: Yup.Schema = Yup.object().shape({
    filter: Yup.string()
      .notRequired()
      .matches(/^(?!\s+$).*/, getLabel('table.filter.validation.no-spaces'))
      .min(3, filterMinLength)
      .nullable()
      .transform((value) => (value ? value : null)),
  });

  const { values, setFieldValue, handleReset, handleSubmit, touched, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: typeof initialValues) => {
      column?.setFilterValue(values.filter);
      setOpen?.(false);
    },
    onReset: () => {
      column?.setFilterValue('');
      setOpen?.(false);
    },
  });

  React.useEffect(() => {
    if (open && !values.filter) {
      const filterField = document.getElementById(filterId);
      filterField?.focus?.({ preventScroll: true });
    }
  }, [column?.id, values.filter, open, filterId]);

  return (
    <form onSubmit={handleSubmit}>
      <VerticalSpacing>
        <TextField
          id={filterId}
          label={filterLabel}
          placeholder={filterPlaceholder}
          icon="close"
          onIconClick={handleReset}
          value={(values.filter as string) || ''}
          onChange={(value) => setFieldValue('filter', value)}
          helper={touched.filter && errors.filter ? { text: errors.filter, type: 'error' } : { text: filterMinLength }}
          input={{
            autoComplete: 'off',
          }}
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
