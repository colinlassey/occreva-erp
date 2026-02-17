import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/session";

export async function GET() {
  try {
    const auth = await getAuthContext();

    return NextResponse.json({
      userId: auth.userId,
      workspaceId: auth.workspaceId,
      role: auth.role,
      email: auth.userEmail,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 },
    );
  }
}
