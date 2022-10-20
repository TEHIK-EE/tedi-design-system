import { Col, Row } from '../../grid';
import { useLabels } from '../../label-provider';
import DatePicker, { DatePickerProps } from '../datepicker/datepicker';
import FormHelper from '../form-helper/form-helper';
import TimePicker, { TimePickerProps } from '../timepicker/timepicker';

export type DateTimePickerProps = Omit<DatePickerProps, 'label'> &
  Omit<TimePickerProps, 'label'> & {
    /**
     * The label value of datepicker.
     */
    dateLabel: string;
    /**
     * The label value of timePicker.
     */
    timeLabel: string;
  };

export const DateTimePicker = (props: DateTimePickerProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    id,
    dateLabel = getLabel('date'),
    timeLabel = getLabel('time'),
    maxDate,
    minDate,
    renderHours,
    renderMinutes,
    renderSeconds,
    helper,
    ...rest
  } = props;
  return (
    <Row>
      <Col xs={12} lg={6}>
        <DatePicker
          id={`${id}-date`}
          label={dateLabel}
          invalid={helper?.type === 'error'}
          {...rest}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Col>
      <Col xs={12} lg={6}>
        <TimePicker
          id={`${id}-time`}
          label={timeLabel}
          invalid={helper?.type === 'error'}
          {...rest}
          renderHours={renderHours}
          renderMinutes={renderMinutes}
          renderSeconds={renderSeconds}
        />
      </Col>
      {helper && (
        <Col>
          <FormHelper {...helper} />
        </Col>
      )}
    </Row>
  );
};

export default DateTimePicker;
