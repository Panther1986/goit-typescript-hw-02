export interface Image {
  alt: string;
  id: string;
  small: string;
  regular: string;
  likes: number;
  create: number;
}

export interface UnsplashImage {
  client_id: string;
  query: string;
  orientation: string;
  page: number;
  per_page: number;
  likes: number;
  create: number;
}
