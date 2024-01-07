import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import PostFeed from "./PostFeed";
import { notFound } from "next/navigation";
import Link from "next/link";

const CustomFeed = async () => {
  const session = await getAuthSession();

  // only rendered if session exists, so this will not happen
  if (!session) return notFound();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  if (followedCommunities.length === 0) {
    return (
      <div className="flex flex-col col-span-2 space-y-6">
        <h2>
          You have not subscribed to any communities. Subscribe to{" "}
          <Link href={"/r/cats"} className="underline">
            r/cats{" "}
          </Link>
          or{" "}
          <Link href={"/r/clashRoyale"} className="underline">
            r/clashRoyale{" "}
          </Link>
          to view their posts. Or{" "}
          <Link href={"r/create"} className="underline">
            create your own community
          </Link>
        </h2>
      </div>
    );
  }

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunities.map((sub) => sub.subreddit.name),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
