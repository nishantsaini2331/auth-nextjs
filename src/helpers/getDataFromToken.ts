import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface DecodedToken {
  id: string;
  username: string;
  email: string;
}

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as DecodedToken;
    return decodedToken.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during token verification.");
  }
}
