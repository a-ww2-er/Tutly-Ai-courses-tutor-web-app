import { User } from "next-auth";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Props = {
  user: User;
};
//npx shadcn-ui@latest add avatar
const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="user profile"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
