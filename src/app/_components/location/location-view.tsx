"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import RichViewer from "~/components/ui/rich-text/rich-viewer";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Location } from "~/data/typings";

const LocationView = ({
  location,
}: {
  location: Location;
}) => {
  const router = useRouter();

  return (
    <>
      {location &&
        <>
          <Card>
            <CardHeader>
              <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <CardTitle>{location.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => router.push(`/${location.campaignId}/locations/edit/${location.id}`)}>
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <CardDescription>

              </CardDescription>
            </CardHeader>
            <CardContent>
              <RichViewer content={location.description ?? ""} />
              {location.imageUrl && <div className="row-span-4"><img className="rounded-md border object-cover" width="500px" height="500px" src={location.imageUrl} /></div>}
            </CardContent>
          </Card>
        </>
      }
    </>
  )
};

export default LocationView;