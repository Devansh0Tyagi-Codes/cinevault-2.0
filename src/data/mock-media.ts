export interface MovieItem {
  id: string;
  title: string;
  year: number;
  director: string;
  cinematographer?: string;
  runtime?: string;
  certification?: string;
  tmdbRating: number;
  tmdbVotes: string;
  synopsis: string;
  imageUrl: string;
  aspectRatio?: string;
  genres: string[];
  photoCredit?: string;
}

export interface ReleaseRadarItem {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  releaseType: 'Theatrical' | 'Digital Premiere' | 'Festival Debut';
  region: string;
  certification?: string;
  daysRemaining?: number;
  imageUrl: string;
}

export const HERO_DISPATCH: MovieItem = {
  id: 'dune-part-two',
  title: 'Dune: Part Two',
  year: 2024,
  director: 'Denis Villeneuve',
  cinematographer: 'Greig Fraser',
  runtime: '166 MIN',
  certification: 'UA / PG-13',
  tmdbRating: 8.5,
  tmdbVotes: '14,200',
  genres: ['Science Fiction', 'Adventure', 'Drama'],
  synopsis:
    'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
  imageUrl:
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
  photoCredit: 'Warner Bros. Pictures / Legendary Entertainment',
};

export const TRENDING_REPERTOIRE: {
  lead: MovieItem;
  dualFrames: MovieItem[];
  digest: MovieItem[];
} = {
  lead: {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    year: 2023,
    director: 'Christopher Nolan',
    cinematographer: 'Hoyte van Hoytema',
    runtime: '180 MIN',
    certification: 'A / R',
    tmdbRating: 8.1,
    tmdbVotes: '13,900',
    genres: ['Biography', 'Historical Drama'],
    synopsis:
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb, rendered through high-contrast 65mm celluloid realism and intense moral reckoning.',
    imageUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1894&auto=format&fit=crop',
    photoCredit: 'Universal Pictures / Syncopy Inc.',
  },
  dualFrames: [
    {
      id: 'past-lives',
      title: 'Past Lives',
      year: 2023,
      director: 'Celine Song',
      cinematographer: 'Shabier Kirchner',
      runtime: '106 MIN',
      certification: 'UA / PG-13',
      tmdbRating: 7.9,
      tmdbVotes: '4,100',
      genres: ['Romance', 'Drama'],
      synopsis:
        'Two deeply connected childhood friends are wrested apart after Nora’s family emigrates from South Korea, only to be reunited two decades later in New York.',
      imageUrl:
        'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1740&auto=format&fit=crop',
      photoCredit: 'A24 / CJ ENM',
    },
    {
      id: 'anatomy-of-a-fall',
      title: 'Anatomy of a Fall',
      year: 2023,
      director: 'Justine Triet',
      cinematographer: 'Simon Beaufils',
      runtime: '151 MIN',
      certification: 'A / R',
      tmdbRating: 7.6,
      tmdbVotes: '3,800',
      genres: ['Crime', 'Mystery', 'Drama'],
      synopsis:
        'A woman is suspected of her husband’s murder, and their blind son faces a moral dilemma as the main witness in an icy courtroom in the French Alps.',
      imageUrl:
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1718&auto=format&fit=crop',
      photoCredit: 'Le Pacte / Neon',
    },
  ],
  digest: [
    {
      id: 'poor-things',
      title: 'Poor Things',
      year: 2023,
      director: 'Yorgos Lanthimos',
      tmdbRating: 7.8,
      tmdbVotes: '6,300',
      genres: ['Fantasy', 'Comedy', 'Sci-Fi'],
      synopsis: 'The incredible tale of Bella Baxter, a young woman brought back to life by an unorthodox scientist.',
      imageUrl:
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1548&auto=format&fit=crop',
    },
    {
      id: 'the-zone-of-interest',
      title: 'The Zone of Interest',
      year: 2023,
      director: 'Jonathan Glazer',
      tmdbRating: 7.2,
      tmdbVotes: '2,900',
      genres: ['Historical', 'Drama'],
      synopsis: 'Auschwitz commandant Rudolf Höss and his wife strive to build a dream life next to the camp.',
      imageUrl:
        'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1740&auto=format&fit=crop',
    },
    {
      id: 'killers-of-the-flower-moon',
      title: 'Killers of the Flower Moon',
      year: 2023,
      director: 'Martin Scorsese',
      tmdbRating: 7.5,
      tmdbVotes: '4,800',
      genres: ['Crime', 'Western', 'Drama'],
      synopsis: 'Real-love crosses paths with unspeakable betrayal in 1920s Oklahoma oil-boom Osage Nation.',
      imageUrl:
        'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1728&auto=format&fit=crop',
    },
  ],
};

export const RELEASE_RADAR_MOCK: {
  releasingThisWeek: ReleaseRadarItem[];
  inTheatersNow: ReleaseRadarItem[];
  comingSoon: ReleaseRadarItem[];
} = {
  releasingThisWeek: [
    {
      id: 'gladiator-2',
      title: 'Gladiator II',
      director: 'Ridley Scott',
      releaseDate: 'November 15, 2024',
      releaseType: 'Theatrical',
      region: 'IN (India Theatrical)',
      certification: 'A',
      daysRemaining: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=1740&auto=format&fit=crop',
    },
    {
      id: 'wicked',
      title: 'Wicked',
      director: 'Jon M. Chu',
      releaseDate: 'November 22, 2024',
      releaseType: 'Theatrical',
      region: 'IN (India Theatrical)',
      certification: 'UA',
      daysRemaining: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1738&auto=format&fit=crop',
    },
  ],
  inTheatersNow: [
    {
      id: 'kalki-2898-ad',
      title: 'Kalki 2898 AD',
      director: 'Nag Ashwin',
      releaseDate: 'June 27, 2024',
      releaseType: 'Theatrical',
      region: 'IN (India Theatrical)',
      certification: 'UA',
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1744&auto=format&fit=crop',
    },
    {
      id: 'stree-2',
      title: 'Stree 2',
      director: 'Amar Kaushik',
      releaseDate: 'August 15, 2024',
      releaseType: 'Theatrical',
      region: 'IN (India Theatrical)',
      certification: 'UA',
      imageUrl:
        'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1628&auto=format&fit=crop',
    },
  ],
  comingSoon: [
    {
      id: 'nosferatu',
      title: 'Nosferatu',
      director: 'Robert Eggers',
      releaseDate: 'December 25, 2024',
      releaseType: 'Theatrical',
      region: 'International Debut',
      imageUrl:
        'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1740&auto=format&fit=crop',
    },
    {
      id: 'mickey-17',
      title: 'Mickey 17',
      director: 'Bong Joon-ho',
      releaseDate: 'April 18, 2025',
      releaseType: 'Theatrical',
      region: 'Global Theatrical',
      imageUrl:
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1744&auto=format&fit=crop',
    },
  ],
};

export const CURATOR_RETROSPECTIVE = {
  title: 'The Visual Poetry of Wong Kar-wai',
  period: '1990 — 2004 Hong Kong Retrospective',
  essay:
    'Characterized by saturated step-printing, elliptical editing, and the lush cinematography of Christopher Doyle and Mark Lee Ping-bing, Wong Kar-wai’s cinema explores memory, yearning, and the temporal ache of urban displacement.',
  imageUrl:
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1884&auto=format&fit=crop',
  films: [
    { title: 'Chungking Express', year: 1994, runtime: '102 MIN', score: '8.0' },
    { title: 'In the Mood for Love', year: 2000, runtime: '98 MIN', score: '8.2' },
    { title: '2046', year: 2004, runtime: '129 MIN', score: '7.5' },
  ],
};
