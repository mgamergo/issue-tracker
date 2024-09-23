import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET (request: NextRequest) {
    const session = await auth();
    

    if(!session) {
        return NextResponse.json({ message: "Not authenticated" }, {status: 401});
    }

    // Check if the user object contains the necessary fields
    const { user } = session;
    if (!user || !user.image) {
        console.log("User data is missing or incomplete", user);
    }
    return NextResponse.json({ user: session?.user }, { status: 200 });
}

