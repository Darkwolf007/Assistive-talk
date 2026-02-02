
export const speak = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const speakWithVoice = () => {
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
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  // Chrome requires voices to be loaded - they load async
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    speakWithVoice();
  } else {
    // Wait for voices to load (Chrome specific)
    window.speechSynthesis.onvoiceschanged = () => {
      speakWithVoice();
    };
    // Fallback: try anyway after short delay
    setTimeout(speakWithVoice, 100);
  }
};

// Pre-load voices on page load for Chrome (only in browser)
export const initSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
};
