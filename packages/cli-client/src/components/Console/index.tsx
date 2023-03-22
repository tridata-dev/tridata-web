import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Console from "./Console";
import CommandLineIcon from "../icons/CommandLine";
import React from "react";

function ConsoleHome() {
	const [open, setOpen] = useState(false);

	const toggleConsole = () => {
		setOpen(!open);
	};

	return (
		<section id="console" className="fixed right-4 bottom-10 font-mono">
			<button className="flex items-center " onClick={toggleConsole}>
				<CommandLineIcon />
				<h3 className="ml-1">Console</h3>
			</button>

			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
					<div className="fixed inset-0 bg-gray-300 opacity-50" />
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-100 sm:duration-300"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-100 sm:duration-300"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
										<div className="flex h-full flex-col overflow-y-scroll bg-black py-6 shadow-xl">
											<Console />
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</section>
	);
}

export default React.memo(ConsoleHome);
