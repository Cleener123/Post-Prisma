import prisma from '@/lib/prisma'

export async function GET() {
  return Response.json(await prisma.post.findMany())
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json()
    const newPost = await prisma.post.create({
      data: {
        title,  
        content,
        authorId: 1, // Assuming author with ID 1 exists
      },
    })
    return Response.json(newPost)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}