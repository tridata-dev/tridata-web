import { useEffect, useRef } from "react";

type Props = {
	drawCanvasCode: string;
};

export default function RCanvas({ drawCanvasCode }: Props) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (ref.current) {
			const ctx = ref.current.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, ref.current.width * 2, ref.current.height * 2);
				drawCanvasCode
					.trim()
					.split("\n")
					.forEach((statement) => {
						if (statement.trim() === "") return;
						Function(`this.${statement}`).bind(ctx)();
					});
				ctx.scale(0.5, 0.5);
			}
		}
	}, [drawCanvasCode]);

	return <canvas ref={ref} width={500} height={500} />;
}
