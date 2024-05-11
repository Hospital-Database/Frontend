import { useRouter } from "@/navigation";
import { Button } from "@mantine/core";

export default function Logout({ width, mt }: { width?: string; mt?: string }) {
	const router = useRouter();
	return (
		<Button
			w={width}
			mt={mt}
			variant="transparent"
			onClick={() => {
				localStorage.removeItem("user");
				router.push("/login");
			}}
		>
			Logout
		</Button>
	);
}
