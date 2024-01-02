import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, content, subredditId } = PostValidator.parse(body);

    // verify if user is subscribed to the passes subreddit id
    const subscription = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });
    if (!subscription) {
      return new Response("Subscribe to post", { status: 403 });
    }

    // Create post and associate it with user
    const post = await db.post.create({
      data: {
        title,
        content,
        subredditId,
        authorId: session.user.id,
      },
    });
    return new Response("Post created", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not post to subreddit, please try later", {
      status: 500,
    });
  }
}
