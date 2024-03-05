import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  white?: boolean;
}

export default function LoadingSpinner({
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      {...props}
    >
      {props.white ? (
        <div className="rounded-full border-4 border-white border-l-[#9ADACA] h-8 w-8 animate-spin" />
      ) : (
        <div className="rounded-full border-4 border-blue-300 border-l-[#C3E9DF] h-8 w-8 animate-spin" />
      )}
    </div>
  );
}
