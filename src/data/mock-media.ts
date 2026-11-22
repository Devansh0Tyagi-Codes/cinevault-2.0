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
  posterUrl?: string;
  backdropUrl?: string;
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
  posterUrl?: string;
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
  imageUrl: 'https://image.tmdb.org/t/p/w1280/uhUO7vQQKvCTfQWubOt5MAKokbL.jpg',
  posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
  backdropUrl: 'https://image.tmdb.org/t/p/w1280/uhUO7vQQKvCTfQWubOt5MAKokbL.jpg',
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
    imageUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/nnUQql9L8fI3b0N4v1pvdUvR71Q.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/lDVl2jf6VB8ODl1olZ6FLvOV1gX.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/lDVl2jf6VB8ODl1olZ6FLvOV1gX.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/lDVl2jf6VB8ODl1olZ6FLvOV1gX.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
      backdropUrl: 'https://image.tmdb.org/t/p/w1280/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
    },
  ],
  inTheatersNow: [
    {
      id: 'dune-part-two',
      title: 'Dune: Part Two',
      director: 'Denis Villeneuve',
      releaseDate: 'March 1, 2024',
      releaseType: 'Theatrical',
      region: 'IN (India Theatrical)',
      certification: 'UA',
      imageUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    },
    {
      id: 'oppenheimer',
      title: 'Oppenheimer',
      director: 'Christopher Nolan',
      releaseDate: 'July 21, 2023',
      releaseType: 'Theatrical',
      region: 'IN (India Theatrical)',
      certification: 'A',
      imageUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
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
      imageUrl: 'https://image.tmdb.org/t/p/w500/d0B8xDdqBZlzlPEzES8lu5LlNQn.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/d0B8xDdqBZlzlPEzES8lu5LlNQn.jpg',
    },
    {
      id: 'mickey-17',
      title: 'Mickey 17',
      director: 'Bong Joon-ho',
      releaseDate: 'April 18, 2025',
      releaseType: 'Theatrical',
      region: 'Global Theatrical',
      imageUrl: 'https://image.tmdb.org/t/p/w500/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg',
    },
  ],
};

export const CURATOR_RETROSPECTIVE = {
  title: 'The Visual Poetry of Wong Kar-wai',
  period: '1990 — 2004 Hong Kong Retrospective',
  essay:
    'Characterized by saturated step-printing, elliptical editing, and the lush cinematography of Christopher Doyle and Mark Lee Ping-bing, Wong Kar-wai’s cinema explores memory, yearning, and the temporal ache of urban displacement.',
  imageUrl: 'https://image.tmdb.org/t/p/w1280/etjA69oh0nil3HnvWoSV0vY7iqe.jpg',
  films: [
    { title: 'Chungking Express', year: 1994, runtime: '102 MIN', score: '8.0' },
    { title: 'In the Mood for Love', year: 2000, runtime: '98 MIN', score: '8.2' },
    { title: '2046', year: 2004, runtime: '129 MIN', score: '7.5' },
  ],
};
