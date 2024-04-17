import { FormInput, RadioOrCheck } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export default function AdditionalContent() {
	return (
		<section className="space-y-3 grid grid-cols-3 gap-x-8">
			<div className="col-span-2 space-y-5">
				<FormInput name="phoneNumber" label="Phone number" />
				<div>
					<Label>Gender</Label>
					<div className="flex gap-x-4">
						<RadioOrCheck
							name="gender"
							label="male"
							type="radio"
							value="male"
						/>
						<RadioOrCheck
							name="gender"
							label="female"
							type="radio"
							value="female"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
