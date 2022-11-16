const LocalStorage = {
  setItem: (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
  },
  getItem: (name) => {
    const item = localStorage.getItem(name);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  },
  removeItem: (item) => {
    localStorage.removeItem(item);
  },
};

export default LocalStorage;
