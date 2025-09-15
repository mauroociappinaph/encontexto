
export interface ContentBlock {
  type: 'paragraph' | 'highlight' | 'heading';
  text: string;
}

export interface NewsArticle {
  id: number;
  imageUrl: string;
  date: string;
  titular: string;
  bajada: string;
  lead: string;
  cuerpo: ContentBlock[];
  cierre: string;
  categoria: string;
}

export interface Noticias {
  id: number;
  imageUrl: string;
  date: string;
  titular: string;
  bajada: string;
  lead: string;
  cuerpo: ContentBlock[];
  cierre: string;
  categoria: string;
}

// New Interfaces for specialized sections

export interface AlotatoArticle {
  id: number;
  imageUrl: string;
  date: string;
  titular: string;
  bajada: string;
  lead: string;
  cuerpo: ContentBlock[];
  cierre: string;
  categoria: string;
}

export interface QuienEsQuienProfile {
  id: string;
  name: string;
  imageUrl?: string;
  briefReview: string; // Breve reseña
  potentialImpact: string; // Potencial impacto en política y economía
  risksOpportunities: string; // Posibles riesgos u oportunidades
  sources: Source[]; // Reusing Source from existing types
}



export interface ZoomArticle {
  id: string;
  date: string;
  title: string;
  mode: string; // e.g., "objetivo", "crítico", "a favor"
  body: string; // Markdown content
}


export interface Source {
  url: string;
  description: string;
}


export interface Person {
  id: string;
  name: string;
  description: string;
  newsContext: string;
  sources: Source[];
  imageUrl?: string;
}

export interface DolarRate {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export interface ThemedArticle {
  id: number;
  date: string;
  title: string;
  introduction: string;
  body: string;
  conclusion: string;
  final_phrase: string;
  analysis_type: string;
}
