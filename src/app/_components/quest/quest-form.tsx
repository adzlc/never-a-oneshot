"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Npc, Quest, QuestFormValues, QuestInput } from "~/data/typings";
import DemoContainer from "@/components/ui/demo-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./delete-dialog";
import { useRouter } from "next/navigation";
import RichEditor from "~/components/ui/rich-text/rich-editor";
import { Checkbox } from "~/components/ui/checkbox";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

const QuestForm = ({
  campaignId,
  questGivers,
  data,
  submitAction,
  deleteAction
}: {
  campaignId: string, questGivers?: Npc[], data?: Quest | null | undefined, submitAction: (data: QuestFormValues) => Promise<string>,
  deleteAction?: (id: string) => Promise<void>;
}) => {
  const router = useRouter();
  const defaultValues: Partial<QuestFormValues> = {
    name: data?.name ?? "",
    description: data?.description ?? "",
    complete: data?.complete ?? false,
    goldReward: data?.goldReward ?? 0,
    rewards: data?.rewards ?? "",
    questGiverId: data?.questGiverId ?? undefined, // Default must be undefined.
    campaignId: data?.campaignId ?? campaignId,
  };
  const form = useForm<QuestFormValues>({
    resolver: zodResolver(QuestInput),
    defaultValues,
  });
  async function onSubmit(data: QuestFormValues) {
    const id = await submitAction(data);
    router.push(`/${campaignId}/quests`)
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
                  <CardTitle>{data ? `Edit Quest ${data.name}` : 'Create Quest'}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Fill in the quest name" {...field} />
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
                          <RichEditor className="h-[650px]" content={field.value ?? ""} onChange={field.onChange} placeholder="Fill in the quest description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="complete"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormLabel>Completed</FormLabel>
                        <FormControl>
                          <Checkbox checked={field.value}
                            onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="goldReward"
                    render={({ }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormLabel>Gold reward</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="I am pooooor..."
                            {...form.register("goldReward", { valueAsNumber: true })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="questGiverId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quest Giver</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the quest giver" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem key="notset" value="notset">
                              {"Not set"}
                            </SelectItem>
                            {questGivers?.map((questGiver) => (
                              <SelectItem key={questGiver.id} value={questGiver.id}>
                                {questGiver.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 flex justify-end">
                    <div className="grid gap-6 mr-3">
                      <Button className="" type="button" variant="secondary" asChild>
                        <Link href={`/${campaignId}/quests`}>Back</Link>
                      </Button>
                    </div>
                    {data && deleteAction && (
                      <div className="p-6 pt-0 grid gap-6 mr-3">
                        <DeleteDialog
                          quest={data}
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
export default QuestForm;