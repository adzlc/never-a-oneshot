"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CampaignItem, CampaignItemFormValues, CampaignItemInput } from "~/data/typings";
import DemoContainer from "@/components/ui/demo-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./delete-dialog";
import RichEditor from "~/components/ui/rich-text/rich-editor";
import { useTransition } from "react";
import { toast } from "~/hooks/use-toast";

const CampaignItemForm = ({
  campaignId,
  data,
  submitAction,
  deleteAction
}: {
  campaignId: string, data?: CampaignItem | null | undefined, submitAction: (data: FieldValues) => Promise<void>,
  deleteAction?: (id: string) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues: Partial<CampaignItemFormValues> = {
    name: data?.name ?? "",
    description: data?.description ?? "",
    campaignId: data?.campaignId ?? campaignId,
  };
  const form = useForm<CampaignItemFormValues>({
    resolver: zodResolver(CampaignItemInput),
    defaultValues,
  });

  function onSubmit(data: FieldValues) {
    startTransition(async () => {
      try {
        await submitAction(data);
        toast({
          title: "Success",
          description: "Successfully saved campaign item",
        })
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to save campaign item.",
          variant: "destructive",
        })
      }
    });
  }

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
                  <CardTitle>{data ? `Edit Item ${data.name}` : 'Create Campaign Item'}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Fill in the item name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <RichEditor className="h-[650px]" content={field.value ?? ""} onChange={field.onChange} placeholder="Fill in the item description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 flex justify-end">
                    <div className="grid gap-6 mr-3">
                      <Button className="" type="button" variant="secondary" asChild>
                        <Link href={`/${campaignId}/campaignitems`}>Back</Link>
                      </Button>
                    </div>
                    {data && deleteAction && (
                      <div className="p-6 pt-0 grid gap-6 mr-3">
                        <DeleteDialog
                          campaignItem={data}
                          deleteAction={deleteAction}
                        />
                      </div>
                    )}
                    <Button disabled={isPending} type="submit">{isPending ? 'Saving...' : 'Save'}</Button>
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
export default CampaignItemForm;