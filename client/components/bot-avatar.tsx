import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <div className="bg-red-500/10 p-1 rounded-md">
      <Avatar className="h-8 w-8">
        <AvatarImage className="p-1" src="/assets/logo.png" />
      </Avatar>
    </div>
  );
};
