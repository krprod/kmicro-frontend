import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  options: { label: string; value: string }[]
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: FormSelectProps<T>) {
  return (
        <div className="space-y-2">
      <label className="text-sm font-semibold">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}