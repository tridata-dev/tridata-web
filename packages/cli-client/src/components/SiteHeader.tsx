export default function SiteHeader() {
	return (
		<header className="border-b-2 mb-2">
			<nav className="mx-auto flex max-w-7xl items-center justify-center p-2 lg:px-4">
				<ul className="flex items-center">
					<li>
						<a
							href="https://github.com/tridata-dev"
							className="font-mono text-xl hover:text-secondary"
						>
							tridata
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
