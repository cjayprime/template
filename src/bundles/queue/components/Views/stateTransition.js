
export const ACCEPT = 'Accept';
export const NO_STATUS = 'No status';
export const ACCEPTED = 'Accepted';
export const NOT_OWNER = 'Not Owned';
export const AWAITING_PICKUP = 'Awaiting sample pickup';
export const MARK_SAMPLE_AS_RECIEVED = 'MARK SAMPLE AS RECIEVED';
export const SAMPLE_COLLECTED = 'Sample Collected';
export const DELIVER_SAMPLE_LAB = 'DELIVER SAMPLE TO LAB';
export const SAMPLE_DELIVERED = 'Sample Delivered';
export const VIEW_QUEUE_HISTORY = 'View Queue History';

const RRT = {
  DEFAULT_STATE: {
    text: ACCEPT,
    defaultStatus: NO_STATUS,
    nextState: ACCEPTED,
    actionText: ACCEPT.toLowerCase()
  },
  [ACCEPTED]: {
    defaultStatus: AWAITING_PICKUP,
    text: MARK_SAMPLE_AS_RECIEVED,
    nextState: SAMPLE_COLLECTED,
    actionText: SAMPLE_COLLECTED
  },
  [SAMPLE_COLLECTED]: {
    defaultStatus: '',
    text: DELIVER_SAMPLE_LAB,
    nextState: SAMPLE_DELIVERED,
    actionText: SAMPLE_DELIVERED,
  },
  [SAMPLE_DELIVERED]: {
    defaultStatus: '',
    text: VIEW_QUEUE_HISTORY,
    nextState: null,
    actionText: null
  }
}
