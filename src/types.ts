export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  description: string;
}

export interface MemoryStory {
  id: string;
  title: string;
  date?: string;
  imageUrl: string;
  story: string;
  tag?: string;
}

export interface FamilyMessage {
  id: string;
  from: string;
  relation: string;
  avatarUrl?: string;
  text: string;
  photoUrl?: string;
  audioUrl?: string;
  audioDuration?: string;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  hint?: string;
  previewImage?: string;
  fullImage?: string;
  options: QuizOption[];
  explanation: string;
}

export interface SurpriseItem {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'smile' | 'memory' | 'read' | 'video' | 'star';
  contentTitle: string;
  contentText: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  isFinal?: boolean;
}

export interface SharedPlan {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export interface GiftSiteData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    openButtonText: string;
    skipButtonText: string;
  };
  greeting: {
    mainTitle: string;
    personalMessage: string[];
    familySignature: string;
    buttonText: string;
  };
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    photos: GalleryPhoto[];
  };
  memories: {
    sectionTitle: string;
    sectionSubtitle: string;
    stories: MemoryStory[];
  };
  messages: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: FamilyMessage[];
  };
  quiz: {
    sectionTitle: string;
    sectionSubtitle: string;
    questions: QuizQuestion[];
  };
  surprises: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: SurpriseItem[];
  };
  plans: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: SharedPlan[];
  };
  finale: {
    mainPhotoUrl: string;
    title: string;
    message: string;
    videoUrl?: string;
    buttons: {
      restart: string;
      gallery: string;
      watchVideo: string;
    };
  };
  music: {
    title: string;
    customAudioUrl?: string; // If left empty, graceful WebAudio synth plays
  };
}
