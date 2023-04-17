import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProgramCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
      <Card>
        <SkeletonText />
      </Card>
    </Card>
  );
};

export default ProgramCardSkeleton;
