type TimeEntry = {
  id: string;
  label: string;
  timestamp: string;
  action: string;
  emotion: string;
  note?: string;
  feedback?: AIFeedback;
  tags?: string[];
};

type Prompt = {
  question: string;
  action: string;
};

type AIFeedback = {
  summary: string;
  emotional_insight: string;
  clarity: 1 | 2 | 3 | 4 | 5;
  follow_ups: string[];
  growth_actions: string[];
  tags: string[];
  category: string[];
};
