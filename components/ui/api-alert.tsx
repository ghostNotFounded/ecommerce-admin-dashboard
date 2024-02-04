import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Copy, Server } from "lucide-react";

interface APIAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<APIAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<APIAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<APIAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard");
  };

  return (
    <Alert className="bg-neutral-950 border-neutral-700">
      <AlertTitle className="flex items-center gap-x-2">
        <Server className="w-4 h-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between w-full">
        <code className="relative rounded px-[0.3rem] py-[0.2rem] bg-neutral-700 text-sm font-semibold font-mono">
          {description}
        </code>

        <Button size="icon" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
