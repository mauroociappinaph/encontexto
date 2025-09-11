import { Person } from '../types';

const mockPeople: Person[] = [
  {
    id: 'charlie-kirk',
    name: 'Charlie Kirk',
    description: 'Charlie Kirk es un activista conservador estadounidense, presentador de radio y fundador de Turning Point USA, una organización sin fines de lucro que promueve el conservadurismo entre los estudiantes universitarios.',
    newsContext: 'Frecuentemente aparece en las noticias por sus comentarios controvertidos sobre política, cultura y educación, así como por su apoyo a figuras políticas conservadoras.',
    sources: [
      { url: 'https://www.turningpointusa.com/', description: 'Sitio oficial de Turning Point USA' },
      { url: 'https://en.wikipedia.org/wiki/Charlie_Kirk', description: 'Charlie Kirk en Wikipedia' }
    ],
    imageUrl: 'https://placehold.co/600x400/f0f0f0/333?text=Charlie+Kirk'
  },
  {
    id: 'alex-jones',
    name: 'Alex Jones',
    description: 'Alex Jones es un presentador de radio estadounidense, teórico de la conspiración y cineasta. Es conocido por su sitio web InfoWars.',
    newsContext: 'Ha sido una figura prominente en las noticias debido a sus controvertidas teorías de conspiración, especialmente las relacionadas con el tiroteo en la escuela primaria Sandy Hook, lo que le ha llevado a enfrentar demandas y sanciones legales.',
    sources: [
      { url: 'https://www.infowars.com/', description: 'Sitio oficial de InfoWars' },
      { url: 'https://en.wikipedia.org/wiki/Alex_Jones', description: 'Alex Jones en Wikipedia' }
    ],
    imageUrl: 'https://placehold.co/600x400/e8e8e8/333?text=Alex+Jones'
  },
  {
    id: 'candace-owens',
    name: 'Candace Owens',
    description: 'Candace Owens es una comentarista política conservadora, autora y activista estadounidense. Es conocida por sus puntos de vista conservadores y su crítica al Partido Demócrata y al movimiento Black Lives Matter.',
    newsContext: 'A menudo es noticia por sus opiniones francas sobre temas raciales, políticos y sociales, y por su apoyo a Donald Trump.',
    sources: [
      { url: 'https://www.dailywire.com/author/candace-owens', description: 'Artículos de Candace Owens en Daily Wire' },
      { url: 'https://en.wikipedia.org/wiki/Candace_Owens', description: 'Candace Owens en Wikipedia' }
    ],
    imageUrl: 'https://placehold.co/600x400/f7f7f7/333?text=Candace+Owens'
  }
];

export const fetchPeople = (): Promise<Person[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPeople);
    }, 500); // Simulate network delay
  });
};