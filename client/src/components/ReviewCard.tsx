import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  role: string;
  result: string;
  quote: string;
  delay?: number;
}

export function ReviewCard({ name, role, result, quote }: ReviewCardProps) {
  return (
    <div className="card-brutal p-6 flex flex-col gap-4 h-full bg-white text-black">
      <div className="flex gap-1 text-primary">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="fill-current w-5 h-5" />
        ))}
      </div>
      <blockquote className="text-lg font-medium leading-relaxed italic">
        "{quote}"
      </blockquote>
      <div className="mt-auto border-t-2 border-black/10 pt-4">
        <p className="font-bold uppercase text-lg">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
        <div className="mt-2 inline-block bg-green-100 text-green-800 px-2 py-1 text-xs font-bold uppercase border border-green-800 rounded-sm">
          Result: {result}
        </div>
      </div>
    </div>
  );
}
