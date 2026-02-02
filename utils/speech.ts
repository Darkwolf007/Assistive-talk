
// Store voices globally once loaded
let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

export const initSpeech = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const loadVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
    voicesLoaded = cachedVoices.length > 0;
    console.log('Voices loaded:', cachedVoices.length);

    // Log Tamil voices specifically
    const tamilVoices = cachedVoices.filter(v => v.lang.startsWith('ta'));
    console.log('Tamil voices:', tamilVoices.map(v => `${v.name} (${v.lang})`));
  };

  // Load immediately
  loadVoices();

  // Chrome loads voices async
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
};

export const speak = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.log('Speech synthesis not available');
    return;
  }

  console.log('Speak called with:', text);

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Get voices
  const voices = voicesLoaded ? cachedVoices : window.speechSynthesis.getVoices();
  console.log('Available voices:', voices.length);

  // Priority: Google Tamil > Any Tamil > Google Hindi > Any Indian > English
  let selectedVoice = voices.find(v => v.name.toLowerCase().includes('google') && v.lang.startsWith('ta'));

  if (!selectedVoice) {
    selectedVoice = voices.find(v => v.lang.startsWith('ta')); // Any Tamil
  }
  if (!selectedVoice) {
    selectedVoice = voices.find(v => v.name.toLowerCase().includes('google') && v.lang.includes('IN'));
  }
  if (!selectedVoice) {
    selectedVoice = voices.find(v => v.lang.includes('IN')); // Any Indian language
  }
  if (!selectedVoice) {
    selectedVoice = voices.find(v => v.name.toLowerCase().includes('google')); // Any Google voice
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    console.log('Using voice:', selectedVoice.name, selectedVoice.lang);
  } else {
    utterance.lang = 'ta-IN';
    console.log('No voice found, using default with lang: ta-IN');
  }

  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Debug logging
  utterance.onstart = () => console.log('Speech started');
  utterance.onend = () => console.log('Speech ended');
  utterance.onerror = (e) => console.error('Speech error:', e.error, e);

  // Speak
  window.speechSynthesis.speak(utterance);
  console.log('Speak called, pending:', window.speechSynthesis.pending, 'speaking:', window.speechSynthesis.speaking);
};
