import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)

export default function ActivitySummary({ location, time }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p>Location: {location}</p>
      <p>Time: {time.fromNow()}</p>
    </div>
  );
}

ActivitySummary.propTypes = {
  location: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(dayjs),
};
