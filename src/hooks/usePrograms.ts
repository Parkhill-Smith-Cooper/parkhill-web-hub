import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Program {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: {platform: Platform}[];
  metacritic: number;
}

const usePrograms = () => useData<Program>("/games");

export default usePrograms;