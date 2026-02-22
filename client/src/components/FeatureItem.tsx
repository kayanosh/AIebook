import { Check } from "lucide-react";

interface FeatureItemProps {
  title: string;
  description: string;
}

export function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1 bg-black text-white p-1 rounded-sm flex-shrink-0">
        <Check className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-xl font-bold uppercase mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
