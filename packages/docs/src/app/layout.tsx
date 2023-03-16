import { TRPCProvider } from "@/providers/trpcProvider";
import "./globals.css";
import "./styles/tailwind.css";

export const metadata = {
	title: "Tri: your data assistant",
	description:
		"Tri let's you quickly inspect and manipulate any data online with R, Python, and SQL.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<TRPCProvider>{children}</TRPCProvider>
			</body>
		</html>
	);
}
