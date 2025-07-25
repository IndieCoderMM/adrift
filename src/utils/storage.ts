export const generateID = () => {
  const uuid = crypto.randomUUID();

  return uuid;
};

export const getEntryKey = (id: string) => {
  return `entries:${id}`;
};
