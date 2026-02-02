
export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ta-IN'; // Tamil (India)
  
  // Try to find a Tamil voice
  const voices = window.speechSynthesis.getVoices();
  const tamilVoice = voices.find(v => v.lang.startsWith('ta'));
  
  if (tamilVoice) {
    utterance.voice = tamilVoice;
  }
  
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
};
