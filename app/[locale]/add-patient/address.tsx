import { Select, SelectContent, SelectItem } from "@/components/ui/select";

export default function Address() {
	const getData = () => {
		return [
			{
				الشرقية: [{ فاقوس: ["منشاة القاضي", "مدينة الاحلام"] }],
				الغربية: { ناقوس: [" الغربية ستيي", "مدينة الكوابيس"] },
			},
		];
	};
	return (
		<div>
			<Select>
				<SelectContent>
					{getData().map((item) => (
						<SelectItem value={Object.keys(item)[0]}>
							{Object.keys(item)[0]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select>
				<SelectContent>
					{getData().map((item) => (
						<SelectItem value={Object.keys(item)[0]}>
							{Object.keys(item)[0]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select>
				<SelectContent>
					{getData().map((item) => (
						<SelectItem value={Object.keys(item)[0]}>
							{Object.keys(item)[0]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
