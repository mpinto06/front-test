import moment from 'moment';

export function formatTimestamp(timestamp: string) {
  const m = moment(timestamp);
  return m.format('h:mm a');
}