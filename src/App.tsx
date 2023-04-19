import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import ProgramsGrid from "./components/ProgramsGrid";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePrograms";
import SortSelector from "./components/SortSelector";

export interface ProgramQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
}

function App() {
  const [programQuery, setProgramQuery] = useState<ProgramQuery>(
    {} as ProgramQuery
  );

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={programQuery.genre}
            onSelectGenre={(genre) =>
              setProgramQuery({ ...programQuery, genre })
            }
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <HStack spacing={5} paddingLeft={2} marginBottom={5}>
          <PlatformSelector
            selectedPlatform={programQuery.platform}
            onSelectPlatform={(platform) =>
              setProgramQuery({ ...programQuery, platform })
            }
          />
          <SortSelector
            sortOrder={programQuery.sortOrder}
            onSelectSortOrder={(sortOrder) =>
              setProgramQuery({ ...programQuery, sortOrder })
            }
          />
        </HStack>
        <ProgramsGrid programQuery={programQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
