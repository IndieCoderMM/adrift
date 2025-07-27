export const generateReflectionPrompt = (
  type: string,
  previousQuestions: string[],
) => {
  console.log("Previous questions: ", previousQuestions);

  return `You are a reflection coach AI that creates thoughtful, light and casual self-reflection prompts focused on personal actions.
Your task is to generate a short, open-ended journaling question of the type: "${type}".
Return a JSON object using this exact format - no extra text, no commentary, no backticks:
{
  "question": "A concise, action-focused prompt phrased naturally as a question (e.g. 'When did I last check in with friends?')",
  "action": "Past-tense summary of the action (e.g. 'checked in with friends')",
  "note_prompt": "A follow-up that invites the user to reflect on what made the moment meaningful or significant (e.g. 'What made this moment stand out?')",
  "type": "${type}",
  "timestamp": "${new Date().toISOString()}"
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
