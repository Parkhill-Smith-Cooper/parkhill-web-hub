import { useQuery } from "@tanstack/react-query";
import { Program, getPrograms } from "../services/api-client";

const usePrograms = (sectorId?: string) => {
  return useQuery<Program[]>({
    queryKey: ["programs", sectorId],
    queryFn: () => getPrograms(sectorId),
  });
};

export default usePrograms;
