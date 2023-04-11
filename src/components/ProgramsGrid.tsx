import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Program {
  id: number;
  name: string;
}

interface FetchProgramsResponse {
  count: number;
  results: Program[];
}

const ProgramsGrid = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchProgramsResponse>("/games")
      .then((res) => setPrograms(res.data.results))
      .catch((err) => setError(err.message));
  });

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {programs.map((program) => (
          <li key={program.id}>{program.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ProgramsGrid;
