import { Column } from '@tanstack/react-table';
import cn from 'classnames';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useLabels } from '../../../../providers/label-provider';
import Button from '../../../button/button';
import { Card, CardContent } from '../../../card';
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
}

interface TableFilterFields {
  filter: string;
}

const initialValues: TableFilterFields = { filter: '' };

export function TableFilter<TData extends DefaultTData<TData>>(props: TableFilterProps<TData>): JSX.Element | null {
  const { column } = props;
  const [open, setOpen] = React.useState(false);
  const { getLabel } = useLabels();

  const validationSchema = (): Yup.SchemaOf<TableFilterFields> =>
    Yup.object().shape({
      filter: Yup.string()
        .matches(/^(?!\s+$).*/, getLabel('table.no-spaces'))
        .min(3, getLabel('table.min-length'))
        .required(getLabel('required')),
    });

  const { values, setFieldValue, handleReset, handleSubmit, touched, errors } = useFormik({
    validationSchema: validationSchema(),
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
    if (open) {
      const textField = document.getElementById(`filter-${column.id}`);
      if (textField) {
        textField.focus({ preventScroll: true });
      }
    }
  }, [column.id, open]);

  // TODO Show other filters if input is date for example
  const getInput = (): JSX.Element => {
    return (
      <TextField
        value={values.filter}
        onChange={(value) => setFieldValue('filter', value)}
        id={`filter-${column.id}`}
        label={getLabel('table.filter')}
        placeholder={getLabel('search')}
        icon="close"
        onIconClick={handleReset}
        helper={
          (touched.filter && errors.filter && { type: 'error', text: errors.filter }) || {
            text: getLabel('table.min-length'),
          }
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
              type="outlined"
            />
          </div>
        </TooltipTrigger>
        <Tooltip>
          <Card type="borderless">
            <CardContent padding="xsmall">
              <form onSubmit={handleSubmit}>
                <VerticalSpacing>
                  {getInput()}
                  <Row gutter={2}>
                    <Col>
                      <Button visualType="secondary" onClick={handleReset} fullWidth>
                        {getLabel('cancel')}
                      </Button>
                    </Col>
                    <Col>
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
