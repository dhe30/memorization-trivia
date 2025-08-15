import type { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type FormViewProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void | Promise<void>
}

export function VerseForm<T extends FieldValues>({ form, onSubmit }:FormViewProps<T>) {
  // ...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-white dark">
        <FormField<T>
          control={form.control}
          name={"verse" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verse</FormLabel>
              <FormControl>
                <Input disabled={form.formState.isSubmitting} placeholder="e.g. Gen 1:1" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Loading..." : "Submit"}</Button>
      </form>
    </Form>
  )
}

export { Form }
