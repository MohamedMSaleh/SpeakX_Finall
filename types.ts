
export enum View {
  DASHBOARD = 'DASHBOARD',
  ROADMAP = 'ROADMAP',
  CHALLENGES = 'CHALLENGES',
  TUTORS = 'TUTORS',
  ROOMS = 'ROOMS',
  ACTIVE_ROOM = 'ACTIVE_ROOM',
  CREATE_ROOM = 'CREATE_ROOM',
  CONVERSATIONS = 'CONVERSATIONS', // Kept for DMs
  CHAT_SESSION = 'CHAT_SESSION',
  PRACTICE_MODES = 'PRACTICE_MODES',
  PRACTICE_SESSION = 'PRACTICE_SESSION',
  VOCAB_PRACTICE = 'VOCAB_PRACTICE',
  GRAMMAR_PRACTICE = 'GRAMMAR_PRACTICE',
  PRONUNCIATION_PRACTICE = 'PRONUNCIATION_PRACTICE',
  FLUENCY_PRACTICE = 'FLUENCY_PRACTICE',
  ANALYSIS = 'ANALYSIS',
  TUTOR_BOOKING = 'TUTOR_BOOKING',
  PROFILE = 'PROFILE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SETTINGS = 'SETTINGS',
  SUPPORT = 'SUPPORT',
  TERMS = 'TERMS',
  LEARNING_MAP = 'LEARNING_MAP',
  CAREER_HUB = 'CAREER_HUB',
  ASSESSMENT = 'ASSESSMENT',
  ASSESSMENT_HISTORY = 'ASSESSMENT_HISTORY',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  FRIENDS = 'FRIENDS',
  USER_PROFILE = 'USER_PROFILE',
  LESSON_PLAYER = 'LESSON_PLAYER'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  type?: 'text' | 'audio' | 'image' | 'file';
  text: string;
  timestamp: Date;
  audioUrl?: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  feedback?: string;
}

export interface Tutor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  sessions: number;
  image: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  participants: number;
  points: number;
  image: string;
}
