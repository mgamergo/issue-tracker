import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueControls = () => {
  return (
    <div className="mb-5">
      <Button style={{cursor: "pointer"}}>
        <Link href="issues/new">Add New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueControls;
