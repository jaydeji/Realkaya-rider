import dayjs from 'dayjs';
import en from 'dayjs/locale/en';

dayjs.locale({
  ...en,
  weekStart: 1,
});

export const _date = {
  startOfDay: () => dayjs().startOf('day'),
  formatAmPm: (date: string) => dayjs(date).format('h:mma'),
  formatOne: (date: string) => dayjs(date).format('MMM DD, h:mm A'),
};
