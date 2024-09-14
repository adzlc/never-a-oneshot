import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const NotFoundCard = () => {

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl grow flex-col sm:flex-row sm:py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Page not found</AlertTitle>
          <AlertDescription>
            There is no item matching the given ID.
          </AlertDescription>
        </Alert>
      </div>
    </>
  )
};

export default NotFoundCard;