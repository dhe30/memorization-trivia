import type { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
        <div className="flex gap-4 mb-3">
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField<T>
          control={form.control}
          name={"version" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Version</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={form.formState.isSubmitting}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value}></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NIV">NIV</SelectItem>
                  <SelectItem value="ESV">ESV</SelectItem>
                  <SelectItem value="KJV">KJV</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormDescription className="mb-4">
            {form.formState.isSubmitting ? "Requests can take over 50s" : "Please select verse(s) for trivia generation"}
        </FormDescription>
        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Loading..." : "Submit"}</Button>
      </form>
    </Form>
  )
}

export { Form }
