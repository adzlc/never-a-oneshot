"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Npc, Location, LocationFormValues, LocationInput } from "~/data/typings";
import DemoContainer from "@/components/ui/demo-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./delete-dialog";
import { useRouter } from "next/navigation";
import RichEditor from "~/components/ui/rich-text/rich-editor";
import { UploadButton } from "~/utils/uploadthing";
import { useState } from "react";

const LocationForm = ({
  campaignId,
  questGivers,
  data,
  submitAction,
  deleteAction
}: {
  campaignId: string, questGivers?: Npc[], data?: Location | null | undefined, submitAction: (data: LocationFormValues) => Promise<string>,
  deleteAction?: (id: string) => Promise<void>;
}) => {
  const router = useRouter();
  const defaultValues: Partial<LocationFormValues> = {
    name: data?.name ?? "",
    description: data?.description ?? "",
    campaignId: data?.campaignId ?? campaignId,
    imageUrl: data?.imageUrl ?? "",
  };
  const form = useForm<LocationFormValues>({
    resolver: zodResolver(LocationInput),
    defaultValues,
  });
  async function onSubmit(data: LocationFormValues) {
    if (imageUrl !== undefined && imageUrl !== "") {
      data.imageUrl = imageUrl;
    }
    const id = await submitAction(data);
    router.push(`/${campaignId}/locations`)
  }

  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center w-full"
      >
        <input type="hidden" name="id" value={data?.id} />
        <input type="hidden" name="campaignId" value={campaignId} />
        <div className="flex justify-center rounded-lg w-full">
          <div className="w-full ">
            <DemoContainer>
              <Card>
                <CardHeader>
                  <CardTitle>{data ? `Edit Location ${data.name}` : 'Create Location'}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Fill in the location name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <RichEditor className="h-[650px]" content={field.value ?? ""} onChange={field.onChange} placeholder="Fill in the description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 flex justify-end">
                    <div className="grid gap-6 pr-3">
                      <UploadButton
                        className="text-primary"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          const fileUrl = res[0]?.appUrl;
                          if (fileUrl) {
                            setImageUrl(fileUrl);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                    </div>
                    <div className="grid gap-6 mr-3">
                      <Button className="" type="button" variant="secondary" asChild>
                        <Link href={`/${campaignId}/locations`}>Back</Link>
                      </Button>
                    </div>
                    {data && deleteAction && (
                      <div className="p-6 pt-0 grid gap-6 mr-3">
                        <DeleteDialog
                          location={data}
                          deleteAction={deleteAction}
                        />
                      </div>
                    )}
                    <Button type="submit">Save</Button>
                  </div>
                </CardContent>
              </Card>
            </DemoContainer>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default LocationForm;