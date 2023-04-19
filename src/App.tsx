import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import ProgramsGrid from "./components/ProgramsGrid";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePrograms";
import SortSelector from "./components/SortSelector";
import ProgramHeading from "./components/ProgramHeading";

export interface ProgramQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
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
        <NavBar
          onSearch={(searchText) =>
            setProgramQuery({ ...programQuery, searchText })
          }
        />
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
        <Box paddingLeft={2}>
          <ProgramHeading programQuery={programQuery} />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector
                selectedPlatform={programQuery.platform}
                onSelectPlatform={(platform) =>
                  setProgramQuery({ ...programQuery, platform })
                }
              />
            </Box>
            <SortSelector
              sortOrder={programQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setProgramQuery({ ...programQuery, sortOrder })
              }
            />
          </Flex>
        </Box>
        <ProgramsGrid programQuery={programQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
