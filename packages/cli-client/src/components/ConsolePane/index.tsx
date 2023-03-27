import Console from "./Console";
import React from "react";

function ConsoleHome() {
	return (
		<section className="p-2 bg-black" style={{ height: "50%" }}>
			<Console />
		</section>
	);
}

export default React.memo(ConsoleHome);
