import { Altitude } from 'components/Icons/Altitude';
import { Calendar } from 'components/Icons/Calendar';
import { Clock } from 'components/Icons/Clock';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { Height } from 'components/Icons/Height';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { RemoteIconInformation } from 'components/Information';
import { LocalIconInformation } from 'components/Information/LocalIconInformation';
import {
  InformationCard,
  InformationCardArray,
  InformationCardLabelValues,
  InformationCardTuple,
} from 'modules/results/interface';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

const isInformationCardTuple = (
  information: InformationCard,
): information is InformationCardTuple => information.label === 'date';

const isInformationCardLabeLValues = (
  information: InformationCard,
): information is InformationCardLabelValues => information.label === 'types';

const isInformationCardArray = (
  information: InformationCard,
): information is InformationCardArray => information.label === 'networks';

const getInformationItemProps = (information: InformationCard, intl: IntlShape) => {
  const { label, pictogramUri, value } = information;
  if (label === 'difficulty') {
    return {
      icon: pictogramUri,
      children: <>{value}</>,
    };
  }
  if (label === 'duration') {
    return {
      icon: Clock,
      children: <>{value}</>,
    };
  }
  if (label === 'distance') {
    return {
      icon: CodeBrackets,
      children: <>{value}</>,
    };
  }
  if (label === 'positiveElevation') {
    return {
      icon: TrendingUp,
      children: <>{value}</>,
    };
  }
  if (label === 'negativeElevation') {
    return {
      icon: TrendingUp,
      iconProps: {
        className: '-scale-y-100',
      },
      children: <>{value}</>,
    };
  }
  if (label === 'maxElevation') {
    return {
      icon: Altitude,
      children: <>{value}</>,
    };
  }
  if (label === 'height') {
    return {
      icon: Height,
      children: <>{value}</>,
    };
  }
  if (label === 'courseType') {
    return {
      icon: pictogramUri,
      children: <>{value}</>,
    };
  }
  if (label === 'networks' && isInformationCardArray(information)) {
    return {
      icon: null,
      children: (
        <>
          {Array.isArray(value) && value.length > 0 && (
            <ul className="flex gap-2">
              {value.map(item => (
                <li key={item.label}>
                  <RemoteIconInformation iconUri={item.pictogramUri}>
                    {item.label}
                  </RemoteIconInformation>
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    };
  }
  if (label === 'types' && isInformationCardLabeLValues(information)) {
    return {
      icon: null,
      children: (
        <>
          {information.value.map(
            item =>
              Array.isArray(item?.values) &&
              item.values?.length > 0 && (
                <dl key={item.label} className="text-greyDarkColored">
                  <dt className="font-bold inline">{item.label} : </dt>
                  <dd className="inline">
                    {intl.formatList(item.values, { type: 'conjunction' })}
                  </dd>
                </dl>
              ),
          )}
        </>
      ),
    };
  }
  if (label === 'date' && isInformationCardTuple(information)) {
    return {
      icon: Calendar,
      children:
        information.value[0] === information.value[1] ? (
          <FormattedMessage
            id={'dates.singleDate'}
            values={{
              date: new Intl.DateTimeFormat(intl.locale).format(new Date(information.value[0])),
            }}
          />
        ) : (
          <FormattedMessage
            id={'dates.multipleDates'}
            values={{
              beginDate: new Intl.DateTimeFormat(intl.locale).format(
                new Date(information.value[0]),
              ),
              endDate: new Intl.DateTimeFormat(intl.locale).format(new Date(information.value[1])),
            }}
          />
        ),
    };
  }
  return {
    icon: null,
    children: <>{label}</>,
  };
};

export const InformationCardItem: React.FC<InformationCard> = item => {
  const intl = useIntl();
  const { icon, ...rest } = getInformationItemProps(item, intl);
  if (!icon) {
    return <>{rest.children}</>;
  }
  if (typeof icon === 'string') {
    return <RemoteIconInformation iconUri={icon} {...rest} />;
  }
  return <LocalIconInformation icon={icon} {...rest} />;
};
