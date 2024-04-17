import { cn } from "@/lib/utils";
import {
	type ControllerRenderProps,
	type FieldPath,
	type FieldValues,
	type PathValue,
	useFormContext,
} from "react-hook-form";
import * as Form from "./form";

interface FieldWrapperProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	name: TName;
	label?: string;
	description?: string;
	defaultValue?: PathValue<TFieldValues, TName>;
	disabled?: boolean;
	value?: string;
}

const FieldWrapper = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	label,
	description,
	defaultValue,
	disabled,
	hidden,
	render,
}: FieldWrapperProps<TFieldValues, TName> & {
	hidden?: boolean;
	render: (
		field: ControllerRenderProps<TFieldValues, TName>,
	) => React.ReactElement;
}) => {
	const form = useFormContext<TFieldValues>();
	return (
		<Form.FormField<TFieldValues, TName>
			name={name}
			control={form.control}
			defaultValue={defaultValue}
			disabled={disabled}
			render={({ field }) =>
				hidden ? (
					render(field)
				) : (
					<Form.FormItem>
						{label && <Form.FormLabel>{label}</Form.FormLabel>}
						<Form.FormControl>{render(field)}</Form.FormControl>
						{description && (
							<Form.FormDescription>{description}</Form.FormDescription>
						)}
						<Form.FormMessage />
					</Form.FormItem>
				)
			}
		/>
	);
};

interface FormInputProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
			React.InputHTMLAttributes<HTMLInputElement>,
			"value" | "defaultValue" | "name"
		>,
		FieldWrapperProps<TFieldValues, TName> {}

const FormInput = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	type,
	label,
	description,
	name,
	disabled,
	defaultValue,
	className,
	...props
}: FormInputProps<TFieldValues, TName>) => {
	return (
		<FieldWrapper
			name={name}
			label={label}
			description={description}
			disabled={disabled}
			defaultValue={defaultValue}
			hidden={type === "hidden"}
			render={(field) => (
				<input
					type={type}
					className={cn(
						type !== "hidden" && [
							"flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ",
							"file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
							"focus-visible:outline-none focus-visible:border focus-visible:border-accent  disabled:cursor-not-allowed disabled:opacity-50",
						],
						className,
					)}
					{...props}
					{...field}
				/>
			)}
		/>
	);
};

export interface TextareaProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			"name" | "value" | "defaultValue"
		>,
		FieldWrapperProps<TFieldValues, TName> {}

const Textarea = ({
	label,
	description,
	className,
	defaultValue,
	name,
	disabled,
	...props
}: TextareaProps) => {
	return (
		<FieldWrapper
			name={name}
			label={label}
			description={description}
			defaultValue={defaultValue}
			disabled={disabled}
			render={(field) => (
				<textarea
					className={cn(
						"flex min-h-[80px] rounded-xl w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					{...props}
					{...field}
				/>
			)}
		/>
	);
};
const RadioCheckWrapper = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	label,
	disabled,
	hidden,
	description,
	render,
}: FieldWrapperProps<TFieldValues, TName> & {
	hidden?: boolean;
	render: (
		field: ControllerRenderProps<TFieldValues, TName>,
	) => React.ReactElement;
}) => {
	const form = useFormContext<TFieldValues>();
	return (
		<Form.FormField<TFieldValues, TName>
			name={name}
			control={form.control}
			disabled={disabled}
			render={({ field }) =>
				hidden ? (
					render(field)
				) : (
					<Form.FormItem className="flex items-center gap-x-2 space-y-0">
						<Form.FormControl>{render(field)}</Form.FormControl>
						{label && <Form.FormLabel>{label}</Form.FormLabel>}
						{description && (
							<Form.FormDescription>{description}</Form.FormDescription>
						)}
						<Form.FormMessage />
					</Form.FormItem>
				)
			}
		/>
	);
};
const RadioOrCheck = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	type,
	label,
	description,
	name,
	disabled,
	defaultValue,
	className,
	value,
	...props
}: FormInputProps<TFieldValues, TName>) => {
	return (
		<RadioCheckWrapper
			name={name}
			label={label}
			disabled={disabled}
			description={description}
			render={(field) => (
				<input
					type={type}
					className={cn(
						" w-full rounded-md border border-input bg-background  text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					{...props}
					{...field}
					value={value}
				/>
			)}
		/>
	);
};

export { type FormInputProps, FormInput, Textarea, RadioOrCheck };
