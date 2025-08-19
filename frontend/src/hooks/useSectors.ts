import { useQuery } from "@tanstack/react-query";
import { getSectors } from "../services/api-client";

export interface Sector {
  _id: string;
  name: string;
}

const useSectors = () => {
  return useQuery<Sector[]>({
    queryKey: ["sectors"],
    queryFn: getSectors,
  });
};

export default useSectors;
