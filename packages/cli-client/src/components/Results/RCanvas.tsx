import { cn } from "@/lib/utils";
import { ResultVariant } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
	variant: ResultVariant;
	images: ImageBitmap[];
};

const canvasWidth = 1000;
const canvasHeight = 1000;

export default function RCanvas({ images, variant }: Props) {
	const isConsole = variant === "command";
	const scale = isConsole ? 0.4 : 0.45;
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		const ctx = ref.current.getContext("2d");
		if (!ctx) return;

		images.forEach((image) => {
			ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
		});
	}, [images]);

	return (
		<div
			className={cn("flex  relative bg-white", {
				"bg-white": isConsole,
			})}
			style={{ width: canvasWidth * scale, height: canvasHeight * scale }}
		>
			<canvas ref={ref} width={canvasWidth} height={canvasHeight} />
		</div>
	);
}
