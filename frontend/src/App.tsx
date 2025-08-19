import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import ProgramGrid from "./components/ProgramGrid";

function App() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>();
  const [searchText, setSearchText] = useState("");

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={setSearchText} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedSectorId={selectedSectorId}
            onSelectSector={(sectorId) => setSelectedSectorId(sectorId)}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <ProgramGrid
          selectedSectorId={selectedSectorId}
          searchText={searchText}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
