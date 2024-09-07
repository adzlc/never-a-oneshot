"use client";
import {
  type CampaignFormValues,
  type Campaign,
  CampaignInput,
} from "~/data/typings";
import { Form, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DemoContainer from "@/components/ui/demo-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CampaignDeleteDialog from "./campaign-delete-dialog";


const CampaignForm = ({
  submitAction,
  deleteAction,
  data,
}: {
  submitAction: (data: CampaignFormValues) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
  data?: Campaign | null | undefined;
}) => {
  const defaultValues: Partial<CampaignFormValues> = {
    name: data?.name ?? "",
    description: data?.description ?? "",
  };

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(CampaignInput),
    defaultValues,
  });

  async function onSubmit(data: CampaignFormValues) {
    await submitAction(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex grid w-full h-full grid-cols-1 justify-center"
        >
          <input type="hidden" name="id" value={data?.id} />
          <div className=" items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2 xl:grid-cols-1">
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{data ? `Edit ${data.name}` : "Create Campaign"}</CardTitle>
                  {data == null && <CardDescription>Create a new Campaign</CardDescription>}
                </CardHeader>
                <CardContent className="grid gap-6">
                  <DemoContainer>
                    <div className="col-span-2 grid items-start gap-6 lg:col-span-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Choose a name" {...field} />
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
                              <Textarea
                                placeholder="Enter the description"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </DemoContainer>
                  <div className="mt-6 flex justify-end gap-6">
                    <Button type="submit">{data == null ? "Create" : "Save"}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
      {data && deleteAction && (
        <div className="p-6 pt-0 grid gap-6">
          <CampaignDeleteDialog
            neighbourhood={data}
            deleteAction={deleteAction}
          />
        </div>
      )}
    </>
  );
};

export default CampaignForm;
