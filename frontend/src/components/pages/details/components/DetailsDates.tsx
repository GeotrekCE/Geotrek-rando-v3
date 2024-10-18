import { FormattedMessage, useIntl } from 'react-intl';

type DetailsDatesProps = {
  dates?: {
    hasEndTime: boolean;
    hasBeginTime: boolean;
    beginDate: string;
    endDate: string;
  };
};

const DetailsDates: React.FC<DetailsDatesProps> = ({ dates }) => {
  const intl = useIntl();
  if (!dates) {
    return null;
  }

  const { beginDate, endDate, hasBeginTime, hasEndTime } = dates;

  const dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;

  const timeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  } as Intl.DateTimeFormatOptions;

  const dateTimeFormatOptions = {
    ...dateFormatOptions,
    ...timeFormatOptions,
  };

  if (beginDate.split('T')[0] === endDate.split('T')[0]) {
    if (!hasEndTime) {
      // Output ex : "on November 13, 2024"
      return (
        <FormattedMessage
          id={'dates.singleDate'}
          values={{
            date: new Intl.DateTimeFormat(
              intl.locale,
              hasBeginTime ? dateTimeFormatOptions : dateFormatOptions,
            ).format(new Date(beginDate)),
          }}
        />
      );
    }
    // Output ex : "on November 13, 2024 from 10:00 to 12:00"
    return (
      <>
        <FormattedMessage
          id={'dates.singleDate'}
          values={{
            date: new Intl.DateTimeFormat(intl.locale).format(new Date(beginDate)),
          }}
        />{' '}
        <FormattedMessage
          id={'dates.rangeTime'}
          values={{
            beginTime: new Intl.DateTimeFormat(intl.locale, timeFormatOptions).format(
              new Date(beginDate),
            ),
            endTime: new Intl.DateTimeFormat(intl.locale, timeFormatOptions).format(
              new Date(endDate),
            ),
          }}
        />
      </>
    );
  }
  // Output ex : "from November 13, 2024 to December 25, 2024"
  return (
    <FormattedMessage
      id={'dates.multipleDates'}
      values={{
        beginDate: new Intl.DateTimeFormat(
          intl.locale,
          hasBeginTime ? dateTimeFormatOptions : dateFormatOptions,
        ).format(new Date(beginDate)),
        endDate: new Intl.DateTimeFormat(
          intl.locale,
          hasEndTime ? dateTimeFormatOptions : dateFormatOptions,
        ).format(new Date(endDate)),
      }}
    />
  );
};

export default DetailsDates;
