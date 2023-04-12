import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface Program {
  id: number;
  name: string;
  background_image: string;
}

interface FetchProgramsResponse {
  count: number;
  results: Program[];
}

const usePrograms =() => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchProgramsResponse>("/games", {signal: controller.signal})
      .then((res) => setPrograms(res.data.results))
      .catch((err) => setError(err.message));
    return () => controller.abort();
  }, []);

  return {programs, error};
}

export default usePrograms;