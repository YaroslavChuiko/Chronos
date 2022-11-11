const templates = {
  EMAIL_CONFIRM: {
    subject: 'Please confirm your email',
    file: 'email-confirm.pug',
  },
  CALENDAR_INVITE_CONFIRM: {
    subject: 'Someone wants to share a calendar with you.',
    file: 'calendar-invite.pug',
  },
  EVENT_INVITE_CONFIRM: {
    subject: 'Someone wants to share an event with you.',
    file: 'event-invite.pug',
  },
};

module.exports = templates;
