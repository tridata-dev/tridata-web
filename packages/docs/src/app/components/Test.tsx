"use client";

import { trpc } from "@/providers/trpcProvider";

export default function Test() {
	const hello = trpc.hello.useQuery({ text: "client" });
	if (!hello.data) return <div>Loading...</div>;

	return (
		<div>
			<p>{hello.data.greeting}</p>
		</div>
	);
}
