type EmotionVisual = {
  color: string;
  emoji: string;
};

export const emoteMap: Record<string, EmotionVisual> = {
  motivated: { color: "#15803d", emoji: "😎" }, // vibrant green
  grateful: { color: "#b45309", emoji: "😊" }, // burnt orange
  happy: { color: "#ca8a04", emoji: "😄" }, // golden amber
  excited: { color: "#be185d", emoji: "🤩" }, // bold pink
  calm: { color: "#2563eb", emoji: "😇" }, // bright blue
  depressed: { color: "#1e293b", emoji: "😞" }, // dark slate
  sad: { color: "#1d4ed8", emoji: "😢" }, // vivid blue
  anxious: { color: "#b91c1c", emoji: "😨" }, // deep red
  tired: { color: "#44403c", emoji: "😴" }, // dark gray
  lonely: { color: "#6b21a8", emoji: "🥺" }, // deep purple
} as const;

export const emotions = Object.keys(emoteMap) as Array<keyof typeof emoteMap>;

export const getEmotionVisual = (emotion: string): EmotionVisual => {
  const splitEmotion = emotion.split(" ");
  if (splitEmotion.length > 1) {
    emotion = splitEmotion[1]; // Use the second part for multi-word emotions
  }
  emotion = emotion.toLowerCase();

  return emoteMap[emotion] ?? { color: "#d4d4d4", emoji: "😐" };
};
