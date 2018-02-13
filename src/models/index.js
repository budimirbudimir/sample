export type Artist = {
  bio: Bio,
  image: string[],
  mbid: string,
  name: string,
  ontour: number,
  similar: { artist: SimilarArtist[] },
  stats: Stats,
  streamable: number,
  tags: Tag[],
  url: string,
}

export type SimilarArtist = {
  image: string[],
  name: string,
  url: string,
}

export type TopArtist = {
  name: string,
  image: { string }[],
  listeners: number,
  playcount: number,
  mbid: string,
  streamable: number, // check again
  url: string,
}

export type Tag = {
  name: string,
  url: string,
}

export type Bio = {
  content: string,
  links: { link: Link },
  published: string,
  summary: string,
}

export type Link = {
  #text: string,
  href: string,
  rel: string,
}

export type Stats = {
  listeners: number,
  playcount: number,
}
