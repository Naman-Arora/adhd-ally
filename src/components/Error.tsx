import { AlertCircle } from "lucide-react";

export default function ErrorMessage() {
  return (
    <div className="grid place-items-center gap-4 pt-12">
      <AlertCircle className="h-24 w-24" />
      <h1 className="font-bold text-2xl">An unexpected error occurred!</h1>
      <p className="text-lg">Please contact the ADHDAlly Team.</p>
    </div>
  );
}
