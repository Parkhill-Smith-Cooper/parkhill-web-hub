import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Button,
  Link,
  Box,
  Spacer,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Program } from "../services/api-client";

interface Props {
  program: Program;
}

const ProgramCard = ({ program }: Props) => {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        backgroundColor={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
        height="100%"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
        onClick={onOpen}
      >
        <VStack height="100%" align="stretch" spacing={0}>
          <Box height="200px" overflow="hidden">
            {" "}
            <Image
              src={program.imageUrl}
              alt={program.name}
              width="100%"
              height="200px"
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
          <CardBody display="flex" flexDirection="column" flex="1">
            <Box flex="1">
              <Heading fontSize="2xl">{program.name}</Heading>
              <Text color="red.500" fontSize="lg" fontWeight="semibold">
                {program.developer}
              </Text>
              <Text marginY={2} noOfLines={3}>
                {program.description}
              </Text>
              <HStack marginY={3} spacing={2} flexWrap="wrap">
                {program.sectors.map((sector) => (
                  <Tag
                    key={sector._id}
                    colorScheme="red"
                    size="md"
                    borderRadius="full"
                  >
                    {sector.name}
                  </Tag>
                ))}
              </HStack>
            </Box>
            <HStack justifyContent="space-between" marginTop={4}>
              {program.websiteUrl && (
                <Link
                  href={program.websiteUrl}
                  isExternal
                  _hover={{ textDecoration: "none" }}
                  onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking the website link
                >
                  <Button
                    rightIcon={<ExternalLinkIcon />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                    px={6}
                  >
                    Official Website
                  </Button>
                </Link>
              )}
              {program.parkillGuidesUrl && (
                <Link
                  href={program.parkillGuidesUrl}
                  isExternal
                  _hover={{ textDecoration: "none" }}
                  onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking the guides link
                >
                  <Button
                    rightIcon={<ExternalLinkIcon />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                    px={6}
                  >
                    Our Guides
                  </Button>
                </Link>
              )}
            </HStack>
          </CardBody>
        </VStack>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold">
              {program.name}
            </Text>
            <Text color="red.500" fontSize="lg">
              {program.developer}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={program.imageUrl}
              alt={program.name}
              width="100%"
              height="300px"
              objectFit="cover"
              objectPosition="center"
              borderRadius="md"
              mb={4}
            />
            <Text fontSize="md" mb={4}>
              {program.description}
            </Text>
            <Box mb={4}>
              <Text fontWeight="bold" mb={2}>
                Sectors:
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {program.sectors.map((sector) => (
                  <Tag
                    key={sector._id}
                    colorScheme="red"
                    size="md"
                    borderRadius="full"
                  >
                    {sector.name}
                  </Tag>
                ))}
              </HStack>
            </Box>
            <Box mb={4}>
              <Text fontWeight="bold" mb={2}>
                Status:
              </Text>
              <Tag
                colorScheme={
                  program.status === "Active"
                    ? "green"
                    : program.status === "Inactive"
                    ? "yellow"
                    : "gray"
                }
                size="md"
                borderRadius="full"
              >
                {program.status}
              </Tag>
            </Box>
            {program.topUsers && (
              <Box mt={4}>
                <Text fontWeight="bold" mb={2}>
                  Additional Insights:
                </Text>
                <iframe
                  src={program.topUsers}
                  height="600"
                  width="800"
                  style={{
                    border: "none",
                    width: "100%",
                    maxWidth: "100%",
                    height: "200px",
                  }}
                ></iframe>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            {program.downloadLink && (
              <Link href={program.downloadLink} isExternal mr={3}>
                <Button
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="red"
                  variant="solid"
                >
                  Download/Open
                </Button>
              </Link>
            )}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProgramCard;
