import { Trigram, Achievement } from '../types/game';

export const trigrams: Trigram[] = [
  {
    pinyin: 'qián',
    name: '乾',
    symbol: '☰',
    element: '金',
    meaning: '乾为天 Heaven',
    attributes: ['Strength', 'Leadership', 'Initiative'],
    description: 'Represents pure yang energy, creativity, and the power of heaven.',
    memory: "乾三连： The image of [乾☰] has three solid lines"
  },
  {
    pinyin: 'kūn',
    name: '坤',
    symbol: '☷',
    element: '土',
    meaning: '坤为地 Earth',
    attributes: ['Nurturing', 'Receptivity', 'Support'],
    description: 'Represents pure yin energy, receptivity, and the nurturing power of earth.',
    memory: "坤六断： The image of [坤☷] has three broken lines"
  },
  {
    pinyin: 'zhèn',
    name: '震',
    symbol: '☳',
    element: '木',
    meaning: '震为雷 Thunder',
    attributes: ['Movement', 'Initiative', 'Shock'],
    description: 'Represents sudden movement, awakening, and the power of thunder.',
    memory: "震仰盂： The image of [震☳] is like a bowl right-side-up"
  },
  {
    pinyin: 'gèn',
    name: '艮',
    symbol: '☶',
    element: '土',
    meaning: '艮为山 Mountain',
    attributes: ['Stillness', 'Meditation', 'Stability'],
    description: 'Represents the mountain, stillness, and the power of meditation.',
    memory: "艮覆碗： The image of [艮☶] is like a bowl upside down"
  },
  {
    pinyin: 'lí',
    name: '离',
    symbol: '☲',
    element: 'Fire 火',
    meaning: '离为火 Fire',
    attributes: ['Clarity', 'Beauty', 'Illumination'],
    description: 'Represents fire, light, and the power of clarity and beauty.',
    memory: "离中虚： The image of [离☲] is empty in the center"
  }, 
  {
    pinyin: 'kǎn',
    name: '坎',
    symbol: '☵',
    element: '水',
    meaning: '坎为水 Water',
    attributes: ['Danger', 'Mystery', 'Flow'],
    description: 'Represents flowing water, hidden depths, and life-giving force.',
    memory: "坎中满： The image of [坎☵] is full in the center"
  },
    {
    pinyin: 'duì',
    name: '兑',
    symbol: '☱',
    element: '金',
    meaning: '兑为泽 Lake',
    attributes: ['Joy', 'Pleasure', 'Harmony'],
    description: 'Represents the lake, joy, and the power of harmonious communication.',
    memory: "兑上缺： The image of [兑☱] has a broken line on top"
  },
  {
    pinyin: 'xùn',
    name: '巽',
    symbol: '☴',
    element: '木',
    meaning: '巽为风 Wind',
    attributes: ['Penetration', 'Flexibility', 'Gradual Progress'],
    description: 'Represents gentle penetration, flexibility, and the power of wind.',
    memory: "巽下断： The image of [巽☴] has a broken line below"
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'first_match',
    name: 'First Connection',
    description: 'Make your first correct trigram match',
    unlocked: false,
    progress: 0,
    target: 1
  },
  {
    id: 'ten_streak',
    name: 'Harmony Master',
    description: 'Achieve 10 consecutive correct matches',
    unlocked: false,
    progress: 0,
    target: 10
  },
  {
    id: 'all_trigrams',
    name: 'Eight Paths Mastery',
    description: 'Correctly match all eight trigrams',
    unlocked: false,
    progress: 0,
    target: 8
  },
  {
    id: 'high_score',
    name: 'Wisdom Seeker',
    description: 'Reach a score of 100 points',
    unlocked: false,
    progress: 0,
    target: 100
  }
];

export const getRandomTrigram = (): Trigram => {
  return trigrams[Math.floor(Math.random() * trigrams.length)];
};

export const findTrigramByName = (name: string): Trigram | undefined => {
  return trigrams.find(t => t.name === name);
};

export const getTrigramSymbol = (name: string): string => {
  const trigram = findTrigramByName(name);
  return trigram ? trigram.symbol : '☰';
};