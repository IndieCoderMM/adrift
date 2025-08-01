type ZippedEntry = {
  date: string;
  action: string;
  emotion: string;
  summary?: string;
  insight?: string;
};

export const zipRecentEntries = (
  entries: TimeEntry[],
  limit = 10,
): ZippedEntry[] => {
  return [...entries]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, limit)
    .map((entry) => ({
      date: entry.timestamp,
      action: entry.action,
      emotion: entry.emotion,
      summary: entry.feedback?.summary,
      insight: entry.feedback?.emotional_insight,
    }));
};

export const getInsightPrompot = (zippedData: ZippedEntry[]): string => {
  const data = JSON.stringify(zippedData, null, 2);

  return `You are an emotionally intelligent assistant helping the user reflect deeply on their recent emotional experiences.

Given the journal entries below, analyze them and return a structured, human-like summary *as if you are speaking directly to the user*, using a caring and supportive tone. Your goal is to help the user gain emotional clarity, recognize patterns, and gently guide growth.

Return the output strictly as a JSON object in the following format — **no extra commentary or backticks**:

{
  "emotional_overview": "2-3 sentence summary of user's overall emotional state.",
  "personal_highlights": [ "Insightful moments you've noticed—focus on personal wins or values reflected." ],
  "emotional_dynamics": [ "Noticeable changes, shifts in mood, inner conflicts, or emotional turning points." ],
  "resilience_signals": [ "Subtle signs of strength, emotional recovery, or self-care behaviors." ],
  "growth_opportunities": [ "3 Practical, emotionally aware suggestions the user might explore." ],
  "follow_up_questions": [ "3 Gently provocative questions to help the user reflect further." ]
}

Journal entries:
START>>
${data}
<<END
`;
};

export const generateReflectionPrompt = (
  type: string,
  previousQuestions: string[],
) => {
  return `You are a friendly, thoughtful AI reflection coach. Your role is to generate short, natural-sounding self-reflection prompts that focus on specific personal actions and are anchored in time (e.g. recent past).
Your task is to create a concise journaling question of the type: "${type}".

Please return your response as a single JSON object in the following format (no extra text, no comments, no backticks):
{
  "question": "A single-sentence, casual question that starts with 'When did I ...' and focuses on a specific, tangible personal action (e.g. 'When did I last take time for myself?')",
  "action": "A short past-tense phrase summarizing the action (e.g. 'took time for myself')",
  "note_prompt": "A brief, open-ended follow-up question that invites the user to reflect on what made the moment meaningful or impactful (e.g. 'What made that moment feel good or needed?')",
  "type": "${type}"
}

Avoid generic or abstract questions. Do not repeat previous questions. Here are some examples of previous questions:
  ${previousQuestions}
`;
};

export const getAiPrompt = ({ entry }: { entry: Partial<TimeEntry> }) => {
  return `You are an expert in personal journaling, cognitive reflection, and life-logging systems.  
You help users better understand their emotional patterns and experiences over time.  
Your task is to analyze a single TimeEntry log and provide a thoughtful, structured review.
Always be constructive and use direct conversational tone. You are helping someone make meaning out of their life data.
Here is the log:
  Label: ${entry.label},
  Date: ${entry.timestamp},
  Emotion: ${entry.emotion},
  Note: ${entry.note},
Return the feedback using following structured JSON format (without any other text or backticks):
{
  "summary": "A concise summary of what this entry is about.",
  "emotional_insight": "What emotional themes or depth are present?",
  "clarity": 1-5,  // 5 = vivid, specific, reflective; 1 = vague or low-effort
  "follow_ups": [
    "2 Optional follow-up questions the user might explore to deepen reflection."
  ],
  "growth_actions": [
    "Any actions, themes, or habits the user could work on, based on this entry."
  ],
  "tags": [
    "3-7 relevant keywords to help group similar entries. Use lowercase, snake case."
  ],
  "category": [
    "Select one or two from: Social Connection, Relationship, Health, Wellness, Work, Productivity, Routine, Personal Growth, Hobbies, Leisure, Life Event, Milestone. *Other categories can be used in special entries"
  ]
}
`;
};
