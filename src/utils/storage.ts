export const generateID = () => {
  const uuid = crypto.randomUUID();

  return uuid;
};

export const getEntryKey = (id: string) => {
  return `entries:${id}`;
};

export const getQuestionKey = (id: string) => {
  return `questions:${id}`;
};
