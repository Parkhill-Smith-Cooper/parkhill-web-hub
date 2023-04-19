import { ProgramQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenres";

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

const usePrograms = ( programQuery: ProgramQuery ) => useData<Program>("/games", { params: {genres: programQuery.genre?.id, platforms: programQuery.platform?.id}}, [programQuery]);

export default usePrograms;