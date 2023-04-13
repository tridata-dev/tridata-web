import { cn } from "@/lib/utils";
import Console from "./Console";
import React, { useState } from "react";

const tabs = [
	{ label: "Console" },
	{
		label: "Environment",
	},
];

function ToolsPane() {
	const [activePane, setActivePane] = useState("Console");

	return (
		<section className="p-4 border-t-2 border-white">
			<div className="tabs">
				{tabs.map((tab) => (
					<div
						className={cn("tab p-0", {
							"tab-active": activePane === tab.label,
						})}
						key={tab.label}
					>
						<button
							className="w-full px-2"
							onClick={() => setActivePane(tab.label)}
						>
							{tab.label}
						</button>
					</div>
				))}
			</div>
			{activePane === "Console" && <Console />}
			{activePane === "Environment" && <p className="font-mono p-2">TBD</p>}
		</section>
	);
}

export default React.memo(ToolsPane);
