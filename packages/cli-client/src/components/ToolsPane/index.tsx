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
		<section className="p-2" style={{ height: "50%" }}>
			<div className="tabs">
				{tabs.map((tab) => (
					<div
						className={cn("tab", { "tab-active": activePane === tab.label })}
						key={tab.label}
					>
						<button className="w-full" onClick={() => setActivePane(tab.label)}>
							{tab.label}
						</button>
					</div>
				))}
			</div>
			{activePane === "Console" && <Console />}
			{activePane === "Environment" && <div>TBD</div>}
		</section>
	);
}

export default React.memo(ToolsPane);
