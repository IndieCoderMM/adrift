type TimeEntry = {
  id: string;
  label: string;
  timestamp: string;
  action: string;
  emotion: string;
  reflection_id: string;
  note?: string;
  feedback?: AIFeedback;
  createdAt: number;
};

type Reflection = {
  id: string;
  question: string;
  action: string;
  note_prompt: string;
  type: string;
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

type AIEmotionInsight = {
  emotional_overview: string;
  personal_highlights: string[];
  emotional_dynamics: string[];
  resilience_signals: string[];
  growth_opportunities: string[];
  follow_up_questions: string[];
};
