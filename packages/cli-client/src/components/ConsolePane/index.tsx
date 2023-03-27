import Console from "./Console";
import React from "react";

function ConsoleHome() {
	return (
		<section className="p-2 bg-black">
			<Console />
		</section>
	);
}

export default React.memo(ConsoleHome);
