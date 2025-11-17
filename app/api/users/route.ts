import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({});
    return Response.json(users);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return Response.json(
      { error: "Failed to fetch posts", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const newPost = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return Response.json(newPost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
