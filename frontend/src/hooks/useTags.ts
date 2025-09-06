import { useQuery } from "@tanstack/react-query";
import { getTags } from "../services/api-client";

export interface Tags {
  _id: string;
  name: string;
}

const useTags = () => {
  return useQuery<Tags[]>({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};

export default useTags;
