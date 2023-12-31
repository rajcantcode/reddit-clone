import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { subredditValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();

    const { name } = subredditValidator.parse(body);

    // Check if subreddit already exists
    const subredditExists = await db.subreddit.findFirst({
      where: { name },
    });
    if (subredditExists) {
      return new Response("Subreddit already exists", { status: 409 });
    }

    // Create subreddit and associate it with user
    const subreddit = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    // Creator also has to be subscribed to the subreddit
    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreddit.id,
      },
    });

    return new Response(subreddit.name, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    console.log(error);
    return new Response("Could not create subreddit", { status: 500 });
  }
}
