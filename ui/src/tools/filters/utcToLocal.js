import moment from 'moment-timezone';

import {
  curry,
} from 'ramda';


export const utcToLocal = curry((
  utcDateString,
  format = 'L LT',
) => {
  let { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions().locale;

  if (!moment.localeData(locale)) {
    locale = 'en_US';
  }

  if (!timeZone || !moment.tz.names().includes(timeZone)) {
    timeZone = 'UTC';
  }

  const localeData = moment.localeData(locale);

  // eslint-disable-next-line no-underscore-dangle
  localeData._longDateFormat.LT = 'HH:mm';

  moment.locale(locale);

  if (format === 'fromNow') {
    return moment
      .utc(utcDateString)
      .tz(timeZone)
      .fromNow();
  }

  return moment
    .utc(utcDateString)
    .tz(timeZone)
    .format(format);
});

export const getUtcDate = (utcDateString, format = 'L LT') => moment
  .utc(utcDateString)
  .format(format);
