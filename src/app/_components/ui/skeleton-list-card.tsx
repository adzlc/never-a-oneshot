import { Skeleton } from "~/components/ui/skeleton";

const SkeletonListCard = () => {

  return (
    <div className="flex flex-wrap justify-center m-10 p-4 gap-4">
      <Skeleton className="w-80 h-80 rounded-xl p-4 max-w-sm" />
      <Skeleton className="w-80 h-80 rounded-xl p-4 max-w-sm" />
      <Skeleton className="w-80 h-80 rounded-xl p-4 max-w-sm" />
    </div>
  )
};

export default SkeletonListCard;