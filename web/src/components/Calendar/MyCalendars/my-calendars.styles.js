const base = {
  alignItems: "flex-start",
  flexDirection: "column",
  width: "100%",
};

const styles = {
  checkbox: {
    marginTop: 20,
  },
  calendars: {
    ...base,
    maxHeight: "80%",
    marginTop: 30,
    overflow: "auto",
  },
  subContainer: {
    ...base,
  },
};

export default styles;
