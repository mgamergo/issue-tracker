import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request:NextRequest, 
    {params}: {params: {id: string}}
) {
    const body = await request.json()    // Converting request body to JSON

    const validation = issueSchema.safeParse(body)    // Validating the body input format for required fields with Zod
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const issueDetails = await prisma.issue.findUnique({    // Fetching the issue from the DB
        where: {id: parseInt(params.id)}
    })
    if (!issueDetails) {
        return NextResponse.json({error: "Invalid issue"}, {status: 404})   // Validating if the issue exists
    }

    const updatedIssue = await prisma.issue.update({       // Updating the issue if everything is fine
        where: {id: issueDetails.id},
        data: {
            title: body.title,
            description: body.description,
            status: body.status
        }
    })

    return NextResponse.json(updatedIssue, {status: 200})   // Sending the newly updated issue object as response
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {  
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });
  
    if (!issue)
      return NextResponse.json(
        { error: "Invalid issue" },
        { status: 404 }
      );
  
    await prisma.issue.delete({
      where: { id: issue.id },
    });
  
    return NextResponse.json({});
  }