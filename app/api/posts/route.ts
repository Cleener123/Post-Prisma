import { type NextRequest } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {     
  const searchParams = req.nextUrl.searchParams
  const category = searchParams.get("category")
  const search = searchParams.get("search") || ''
  const sort = searchParams.get("sort") || "desc"
  
  const whereCondition: any = {
    title: {
      contains: search,
      mode: "insensitive",
    },
  }
  
  if (category) {
    whereCondition.category = category
  }

  try {
    const posts = await prisma.post.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: sort === 'desc' ? 'desc' : 'asc',
      },
    })
    
    return Response.json(posts)
  } catch (error: any) {
    console.error("Error fetching posts:", error)
    return Response.json(
      { error: "Failed to fetch posts", message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, category } = await req.json();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
        category: category || 'Uncategorized',
      },
    });
    return Response.json(newPost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
