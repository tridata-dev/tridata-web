import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
	drawCanvasCode: string;
};

const drawCanvas = (ctx: CanvasRenderingContext2D, code: string) => {
	const lines = code.trim().split("\n");
	lines.forEach((line) => {
		if (line.trim() === "") return;
		Function(`this.${line}`).bind(ctx)();
	});
};

export default function RCanvas({ drawCanvasCode }: Props) {
	const renderCanvas = useCallback(
		(canvas: HTMLCanvasElement) => {
			if (canvas) {
				const ctx = canvas.getContext("2d");
				if (ctx) {
					drawCanvas(ctx, drawCanvasCode);
				}
			}
		},
		[drawCanvasCode],
	);

	return (
		<div
			className="flex flex-center relative"
			style={{ width: 1000 * 0.5, height: 1000 * 0.5 }}
		>
			<canvas ref={renderCanvas} width={1000} height={1000} />
		</div>
	);
}
