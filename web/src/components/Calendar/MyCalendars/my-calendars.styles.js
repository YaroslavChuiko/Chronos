const base = {
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
};

const styles = {
  checkbox: {
    marginTop: '20px',
  },
  newCalendar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  calendars: {
    ...base,
    maxHeight: '80%',
    marginTop: '30px',
    overflow: 'auto',
  },
  subContainer: {
    ...base,
  },
};

export default styles;
