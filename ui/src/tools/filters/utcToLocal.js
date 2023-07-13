import moment from 'moment-timezone';

import {
  curry,
} from 'ramda';


export const utcToLocal = curry((
  store,
  utcDateString,
  format = 'L LT',
  localize = true,
  timezoneInfo = {},
) => {
  const settings = {
    ...store.getters['auth/userTimezoneInfo'],
    ...timezoneInfo,
  };

  let { timezone, region: locale } = settings;

  if (!localize || !moment.localeData(locale)) {
    locale = 'en_US';
  }

  if (!timezone || !moment.tz.names().includes(timezone)) {
    timezone = 'UTC';
  }

  const browserLocale = Intl.DateTimeFormat().resolvedOptions().locale;

  const localeData = moment.localeData(browserLocale);

  // eslint-disable-next-line no-underscore-dangle
  localeData._longDateFormat.LT = settings.time_24h ? 'HH:mm' : 'h:mm A';

  moment.locale(browserLocale);

  if (format === 'fromNow') {
    return moment
      .utc(utcDateString)
      .tz(timezone)
      .fromNow();
  }

  return moment
    .utc(utcDateString)
    .tz(timezone)
    .format(format);
});

export const getUtcDate = (utcDateString, format = 'L LT') => moment
  .utc(utcDateString)
  .format(format);
