"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CLASSES, PlayerCharacter, PlayerCharacterFormValues, PlayerCharacterInput } from "~/data/typings";
import DemoContainer from "@/components/ui/demo-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./delete-dialog";
import { useRouter } from "next/navigation";

const PlayerCharacterForm = ({
  campaignId,
  data,
  submitAction,
  deleteAction
}: {
  campaignId: string, data?: PlayerCharacter | null | undefined, submitAction: (data: PlayerCharacterFormValues) => Promise<string>,
  deleteAction?: (id: string) => Promise<void>;
}) => {
  const router = useRouter();

  const defaultValues: Partial<PlayerCharacterFormValues> = {
    name: data?.name ?? "",
    race: data?.race ?? "",
    class: data?.class ?? "",
    backstory: data?.backstory ?? "",
    campaignId: data?.campaignId ?? ""
  };
  const form = useForm<PlayerCharacterFormValues>({
    resolver: zodResolver(PlayerCharacterInput),
    defaultValues,
  });

  async function onSubmit(data: PlayerCharacterFormValues) {
    await submitAction(data);
    router.push(`/${campaignId}/playercharacters`)
  }
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
                  <CardTitle className='text-primary'>{data ? `Edit Character ${data.name}` : 'Create Player character'}</CardTitle>
                  <CardDescription>
                    Fill in your Character's birth certificate.
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
                    name="backstory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backstory</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Fill in your character's backstory" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 flex justify-end">
                    <div className="pr-3 grid gap-6">
                      <Button className="" type="button" variant="secondary" asChild>
                        <Link href={`/${campaignId}/playercharacters`}>Back</Link>
                      </Button>
                    </div>
                    {data && deleteAction && (
                      <div className="pr-3 pt-0 grid gap-6">
                        <DeleteDialog
                          data={data}
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
export default PlayerCharacterForm;