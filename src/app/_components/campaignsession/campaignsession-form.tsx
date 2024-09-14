"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CampaignSession, CampaignSessionFormValues, CampaignSessionInput } from "~/data/typings";
import DemoContainer from "@/components/ui/demo-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import DeleteDialog from "./delete-dialog";
import { useRouter } from "next/navigation";
import RichEditor from "~/components/ui/rich-text/rich-editor";

const CampaignSessionForm = ({
  campaignId,
  data,
  submitAction,
  deleteAction
}: {
  campaignId: string, data?: CampaignSession | null | undefined, submitAction: (data: CampaignSessionFormValues) => Promise<string>,
  deleteAction?: (id: string) => Promise<void>;
}) => {
  const router = useRouter();
  const defaultValues: Partial<CampaignSessionFormValues> = {
    name: data?.name ?? "",
    overview: data?.overview ?? "",
    sessionDate: data?.sessionDate ?? new Date(),
  };
  const form = useForm<CampaignSessionFormValues>({
    resolver: zodResolver(CampaignSessionInput),
    defaultValues,
  });
  async function onSubmit(data: CampaignSessionFormValues) {
    const id = await submitAction(data);
    router.push(`/${campaignId}/campaignsessions`)
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
                  <CardTitle>{data ? `Edit Session ${data.name}` : 'Create Campaign Session'}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title for the overview" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sessionDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of session</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="overview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overview</FormLabel>
                        <FormControl>
                          <RichEditor className="h-[650px]" content={field.value ?? ""} onChange={field.onChange} placeholder="Fill in the session overview" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 flex justify-end">
                    <div className="grid gap-6 mr-3">
                      <Button className="" type="button" variant="secondary" asChild>
                        <Link href={`/${campaignId}/campaignsessions`}>Back</Link>
                      </Button>
                    </div>
                    {data && deleteAction && (
                      <div className="p-6 pt-0 grid gap-6 mr-3">
                        <DeleteDialog
                          campaignSession={data}
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
export default CampaignSessionForm;