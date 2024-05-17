import { accessTokenCookie, refreshTokenCookie } from "@/lib/cookies.client";
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
				accessTokenCookie.delete();
				refreshTokenCookie.delete();
				router.push("/login");
			}}
		>
			Logout
		</Button>
	);
}
