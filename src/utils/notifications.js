
import { toast } from "sonner";
import { BellRing } from "lucide-react";

export const showReminderNotification = (title, message) => {
  toast(title, {
    description: message,
    icon: <BellRing className="h-5 w-5" />,
    duration: 5000,
    position: "top-center"
  });
};
