import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useLabels } from '../../../../../providers/label-provider';
import Button from '../../../../button/button';
import Card from '../../../../card/card';
import CardContent from '../../../../card/card-content/card-content';
import { ChoiceGroupItemProps } from '../../../../form/choice-group';
import ChoiceGroup, { TChoiceGroupValue } from '../../../../form/choice-group/choice-group';
import Col from '../../../../grid/col';
import Row from '../../../../grid/row';
import Heading from '../../../../heading/heading';
import VerticalSpacing from '../../../../vertical-spacing/vertical-spacing';
import styles from '../../../table.module.scss';
import { TableFilterContext } from '../table-filter-context';

export const TableSelectFilter = () => {
  const { getLabel } = useLabels();
  const { column, rows, setOpen, values: contextValues } = React.useContext(TableFilterContext);
  const filterLabel = getLabel('table.filter');
  const inputType = column?.columnDef?.filterFn;
  const fieldName: keyof typeof initialValues = inputType === 'select' ? 'selectFilter' : 'multiSelectFilter';

  const initialValues = {
    inputType,
    selectFilter: contextValues?.selectField,
    multiSelectFilter: contextValues?.multiSelectField,
  };

  const rowValues = rows
    // Get all values for the corresponding column id
    ?.map((i) => {
      if (!column?.columnDef?.id) return;
      return i?.getValue?.(column?.columnDef?.id);
    })
    // Filter out undefined values
    ?.filter(Boolean)
    // Filter out non-unique values
    ?.filter((item, index, array) => array?.indexOf(item) === index)
    // Basic sort for strings and numbers
    ?.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else if (typeof a === 'string' && typeof b === 'string') {
        return a?.localeCompare?.(b);
      } else {
        return 0;
      }
    });

  const options: ChoiceGroupItemProps[] =
    rowValues?.map((i, index) => ({
      id: `${column?.columnDef?.id}-choice-${index}`,
      label: String(i),
      value: String(i),
    })) || [];

  const validationSchema: Yup.SchemaOf<typeof initialValues> = Yup.object().shape({
    inputType: Yup.mixed().nullable(),
    selectFilter: Yup.string().when('inputType', {
      is: 'select',
      then: (schema) => schema.required(getLabel('required')),
    }),
    multiSelectFilter: Yup.array().when('inputType', {
      is: 'multi-select',
      then: (schema) => schema.min(1, getLabel('required')),
    }),
  });

  const { values, setFieldValue, handleReset, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: typeof initialValues) => {
      column?.setFilterValue(values[fieldName]);
      setOpen?.(false);
    },
    onReset: () => {
      column?.setFilterValue('');
      setOpen?.(false);
    },
  });

  const onSelectChange = (item: TChoiceGroupValue) => setFieldValue(fieldName, item);

  const onRemoveAll = () => {
    column?.setFilterValue(null);
    setOpen?.(false);
  };

  const onSelectAll = () => {
    column?.setFilterValue(rowValues);
    setOpen?.(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VerticalSpacing>
        <Heading level={6}>{getLabel('table.filter')}</Heading>
        {inputType === 'multi-select' ? (
          <Row gutter={2} justifyContent="between">
            <Col width="auto">
              <Button visualType="link" onClick={onRemoveAll} fullWidth>
                {getLabel('table.filter.remove-all')}
              </Button>
            </Col>
            <Col width="auto">
              <Button visualType="link" onClick={onSelectAll} fullWidth>
                {getLabel('table.filter.select-all')}
              </Button>
            </Col>
          </Row>
        ) : null}
        <Card className={styles['filter__content']} padding="medium">
          <CardContent>
            <ChoiceGroup
              id={`filter-${fieldName}-${column?.id}`}
              name={filterLabel}
              label={filterLabel}
              hideLabel
              inputType={inputType === 'select' ? 'radio' : 'checkbox'}
              size="small"
              value={values[fieldName]}
              items={options}
              onChange={onSelectChange}
              helper={
                errors[fieldName]?.length !== 0 ? { text: errors[fieldName] as string, type: 'error' } : { text: '' }
              }
            />
          </CardContent>
        </Card>
        <Row gutter={2} justifyContent="end">
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
  );
};
