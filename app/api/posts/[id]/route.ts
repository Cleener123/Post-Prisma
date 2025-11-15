import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return Response.json(
    await prisma.post.findUnique({
      where: { id: parseInt(id) },
    })  
  );
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const {id} = await params;
    const { title, content, authorId } = await req.json()
    return Response.json(await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, authorId }, // Assuming author with ID 1 exists
    }))
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    return Response.json(await prisma.post.delete({
      where: { id: parseInt(id) },
    }))
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}