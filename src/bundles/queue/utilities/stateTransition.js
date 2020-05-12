export const RRT = 'RRT';
export const NO_QUEUE = 'No queue';
export const PSYCHOSOCIAL = 'Psychosocial';
export const EVAC_AND_DECON = 'Evac & Decon';
export const EPID_SURVEILLANCE = 'EPID/Surveillance';
// QUEUES  //
export const ACCEPT = 'ACCEPT';
export const NO_STATUS = 'No status';
export const ACCEPTED = 'Accepted';
export const NOT_OWNER = 'Not Owned';
export const AWAITING_PICKUP = 'Awaiting sample pickup';
export const MARK_SAMPLE_AS_RECIEVED = 'MARK SAMPLE AS RECIEVED';
export const SAMPLE_COLLECTED = 'Sample Collected';
export const DELIVER_SAMPLE_LAB = 'DELIVER SAMPLE TO LAB';
export const SAMPLE_DELIVERED = 'Sample Delivered';
export const VIEW_QUEUE_HISTORY = 'View Queue History';

export const AWAITING_APPOINTMENT = 'Awaiting appointment';
export const BOOK_APPOINTMENT = 'BOOK APPOINTMENT';
export const APPOINTMENT_BOOKED = 'Appointment Booked';

export const DRIVE_THROUGH = 'Drive Through';
export const HOME_PICK_UP = 'Home pick up';

const EVAC_AND_DECON_ = {
  DEFAULT_STATE: {
    text: ACCEPT,
    defaultStatus: NO_STATUS,
    nextState: ACCEPTED,
    actionText: ACCEPT.toLowerCase()
  },
  [ACCEPTED]: {
    defaultStatus: AWAITING_APPOINTMENT,
    text: BOOK_APPOINTMENT,
    nextState: APPOINTMENT_BOOKED,
    dialog: true,
    actionText: null
  },
  [APPOINTMENT_BOOKED]: {
    defaultStatus: APPOINTMENT_BOOKED,
    text: VIEW_QUEUE_HISTORY,
    nextState: null,
    actionText: null
  },
  DIALOG: {
    date: true,
    time: true,
    nextState: APPOINTMENT_BOOKED
  }
};

const RRT_ = {
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
    defaultStatus: SAMPLE_COLLECTED,
    text: DELIVER_SAMPLE_LAB,
    nextState: SAMPLE_DELIVERED,
    actionText: SAMPLE_DELIVERED
  },
  [SAMPLE_DELIVERED]: {
    defaultStatus: SAMPLE_DELIVERED,
    text: VIEW_QUEUE_HISTORY,
    nextState: null,
    actionText: null
  }
};

const EPID_SURVEILLANCE_ = {
  DEFAULT_STATE: {
    text: ACCEPT,
    defaultStatus: NO_STATUS,
    nextState: ACCEPTED,
    actionText: ACCEPT.toLowerCase()
  },
  [ACCEPTED]: {
    defaultStatus: AWAITING_APPOINTMENT,
    text: BOOK_APPOINTMENT,
    nextState: APPOINTMENT_BOOKED,
    dialog: true,
    actionText: null
  },
  [APPOINTMENT_BOOKED]: {
    defaultStatus: APPOINTMENT_BOOKED,
    text: VIEW_QUEUE_HISTORY,
    nextState: null,
    actionText: null
  },
  DIALOG: {
    date: true,
    time: true,
    queue: [RRT],
    reason: [DRIVE_THROUGH, HOME_PICK_UP],
    nextState: APPOINTMENT_BOOKED
  }
};

const PSYCHOSOCIAL_ = {
  DEFAULT_STATE: {
    text: ACCEPT,
    defaultStatus: NO_STATUS,
    nextState: ACCEPTED,
    actionText: ACCEPT.toLowerCase()
  },
  [ACCEPTED]: {
    defaultStatus: AWAITING_APPOINTMENT,
    text: BOOK_APPOINTMENT,
    nextState: APPOINTMENT_BOOKED,
    dialog: true,
    actionText: null
  },
  [APPOINTMENT_BOOKED]: {
    defaultStatus: APPOINTMENT_BOOKED,
    text: VIEW_QUEUE_HISTORY,
    nextState: null,
    actionText: null
  },
  DIALOG: {
    date: true,
    time: true,
    queue: [EVAC_AND_DECON],
    nextState: APPOINTMENT_BOOKED
  }
};

const STATUS = {
  [EPID_SURVEILLANCE]: EPID_SURVEILLANCE_,
  [PSYCHOSOCIAL]: PSYCHOSOCIAL_,
  [RRT]: RRT_,
  [EVAC_AND_DECON]: EVAC_AND_DECON_
};

export default STATUS;
