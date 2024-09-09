"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ALLEGIANCES, CLASSES, Npc, NpcFormValues, NpcInput } from "~/data/typings";
import DemoContainer from "@/components/ui/demo-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DeleteDialog from "./delete-dialog";
import Link from "next/link";
import { UploadButton } from "~/utils/uploadthing";
import { useState } from "react";

const NpcForm = ({
  campaignId,
  data,
  submitAction,
  deleteAction
}: {
  campaignId: string, data?: Npc | null | undefined, submitAction: (data: NpcFormValues) => Promise<void>,
  deleteAction?: (id: string) => Promise<void>;
}) => {
  const defaultValues: Partial<NpcFormValues> = {
    name: data?.name ?? "",
    race: data?.race ?? "",
    class: data?.class ?? "",
    description: data?.description ?? "",
    allegiance: data?.allegiance ?? "",
    faction: data?.faction ?? "",
    campaignId: data?.campaignId ?? "",
    imageUrl: data?.imageUrl ?? ""
  };
  const form = useForm<NpcFormValues>({
    resolver: zodResolver(NpcInput),
    defaultValues,
  });
  async function onSubmit(data: NpcFormValues) {
    data.imageUrl = imageUrl;
    await submitAction(data);
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
        <div className="flex justify-center rounded-lg  w-1/2">
          <div className="w-full ">
            <DemoContainer>
              <Card>
                <CardHeader>
                  <CardTitle>{data ? `Edit NPC ${data.name}` : 'Create NPC'}</CardTitle>
                  <CardDescription>
                    Fill in the NPC's birth certificate.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
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
                    name="race"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Race</FormLabel>
                        <FormControl>
                          <Input placeholder="Choose a race" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CLASSES?.map((clazz) => (
                              <SelectItem key={clazz} value={clazz}>
                                {clazz}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allegiance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allegiance</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose an allegiance" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ALLEGIANCES?.map((allegiance) => (
                              <SelectItem key={allegiance} value={allegiance}>
                                {allegiance}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="faction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faction</FormLabel>
                        <FormControl>
                          <Input placeholder="Faction for the character" {...field} />
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
                        <FormLabel>Backstory</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[200px]" placeholder="Fill in the NPC's information" {...field} />
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
                    <div className="grid gap-6">
                      <Button className="" type="button" variant="secondary" asChild>
                        <Link href={`/npcs/${campaignId}`}>Back</Link>
                      </Button>
                    </div>
                    {data && deleteAction && (
                      <div className="p-6 pt-0 grid gap-6">
                        <DeleteDialog
                          npc={data}
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
export default NpcForm;