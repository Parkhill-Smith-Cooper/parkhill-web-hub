import { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

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

interface FetchProgramsResponse {
  count: number;
  results: Program[];
}

const usePrograms =() => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading]= useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchProgramsResponse>("/games", {signal: controller.signal})
      .then((res) => {setPrograms(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return {programs, error, isLoading };
}

export default usePrograms;