type TimeEntry = {
  id: string;
  label: string;
  timestamp: string;
  action: string;
  notes?: string;
  tags?: string[];
};

type Prompt = {
  question: string;
  action: string;
};
