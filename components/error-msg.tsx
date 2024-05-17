export default function ErrorMessage({
	children,
}: { children: React.ReactNode }) {
	if (!children) return;
	return <p className="text-red-600 text-center text-sm">{children}</p>;
}
