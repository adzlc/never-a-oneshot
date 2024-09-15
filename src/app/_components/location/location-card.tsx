import { type Location } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";


const LocationCard = ({
  location,
}: {
  location: Location;
}) => {

  return (
    <>
      <div className="p-4 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              {location.name}
            </CardTitle>
            <CardDescription>

            </CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </div>
    </>
  )
};

export default LocationCard;