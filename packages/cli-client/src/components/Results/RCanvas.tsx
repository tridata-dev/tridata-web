import { cn } from "@/lib/utils";
import { ResultVariant } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
	variant: ResultVariant;
	drawCanvasCode: string;
};

const canvasWidth = 1000;
const canvasHeight = 1000;

export default function RCanvas({ drawCanvasCode, variant }: Props) {
	const isConsole = variant === "command";
	const scale = isConsole ? 0.4 : 0.5;
	const renderCanvas = useCallback(
		(canvas: HTMLCanvasElement) => {
			if (canvas) {
				const ctx = canvas.getContext("2d");
				if (ctx && drawCanvasCode !== "") {
					Function(drawCanvasCode).bind(ctx)();
				}
			}
		},
		[drawCanvasCode],
	);

	return (
		<div
			className={cn("flex flex-center relative", { "bg-white": isConsole })}
			style={{ width: canvasWidth * scale, height: canvasHeight * scale }}
		>
			<canvas ref={renderCanvas} width={canvasWidth} height={canvasHeight} />
		</div>
	);
}
