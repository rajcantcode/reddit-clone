import { User } from "next-auth";
import { FC } from "react";
import { Avatar } from "./ui/avatar/Avatar";
import Image from "next/image";
import { AvatarFallback, AvatarProps } from "@radix-ui/react-avatar";
import { Icons } from "./icons";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
          {/* <AvatarImage
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          /> */}
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="w-4 h-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
