import { format, parseISO } from 'date-fns';
import groupBy from 'lodash-es/groupBy';
import { BOOKMARK_GROUP_FORMAT } from './constants';

export const bookmarkGroupByMounth = (data) => {
  const groupByMonth = groupBy(data, (bookmark) =>
    format(parseISO(bookmark.created_at), BOOKMARK_GROUP_FORMAT)
  );

  // sort each group data dates
  Object.keys(groupByMonth).forEach((key) => {
    groupByMonth[key].sort(
      (a, b) =>
        parseISO(b.created_at).getTime() - parseISO(a.created_at).getTime()
    );
  });

  return groupByMonth;
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
