import { format, parseISO } from 'date-fns';
import groupBy from 'lodash-es/groupBy';
import { BOOKMARK_GROUP_FORMAT } from './constants';

export const bookmarkGroupByMounth = (data) => {
  const groupByMonth = groupBy(data, (bookmark) =>
    format(parseISO(bookmark.created), BOOKMARK_GROUP_FORMAT)
  );
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
