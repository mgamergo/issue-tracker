import prisma from "@/prisma/client";
import { Box, DropdownMenu, Flex, Grid, Select } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueContents from "./IssueContents";
import DeleteButton from "./DeleteButton";
import { auth } from "@/auth"; // Fetch session in the component
import AssigneeDropdown from "../_components/AssigneeDropdown";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await auth(); // Fetch session to check user authentication
  const issueDetails = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issueDetails) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="8">
      <Box>
        <IssueContents issueDetails={issueDetails} />
      </Box>

      {/* Render Edit/Delete buttons only if the user is authenticated */}
      {session && (
        <Flex direction="column" align="start" gap="3">
          <AssigneeDropdown />
          <EditButton id={parseInt(params.id)} />
          <DeleteButton id={parseInt(params.id)} />
        </Flex>
      )}
    </Grid>
  );
};

export default page;
