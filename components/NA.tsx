export default function NA({ children }: { children?: React.ReactNode }) {
	return <span className="opacity-50">{children || "N/A"}</span>;
}
