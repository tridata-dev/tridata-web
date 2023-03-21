import { useTasks } from "@/hooks/tasks";
import { cn, groupBy } from "@/lib/utils";
import classes from "@/styles/footer.module.css";
import { ChevronRightIcon } from "lucide-react";

export default function SiteFooter() {
	const tasks = useTasks();
	const hasTasks = tasks.length > 0;
	const tasksGrouped = groupBy(tasks, "type");
	const taskTypes = Array.from(tasksGrouped.keys());
	return (
		<footer className="fixed inset-x-0 bottom-0 flex justify-center items-center w-full font-mono">
			{hasTasks && (
				<div className="w-full h-full flex justify-center flex-col items-center footer-shimmer text-sm p-2">
					{taskTypes.map((type) => {
						const tasks = tasksGrouped.get(type);
						if (!tasks) return null;
						return (
							<div className="flex items-center justify-center" key={type}>
								<ol role="list" className="flex items-center space-x-4">
									{tasks.map((task, i) => (
										<li key={task.id}>
											<div className="flex items-center">
												{task.type}
												<span className="ml-2">
													{task.pending ? `${task.duration}s` : "queued"}
												</span>
												{i !== tasks.length - 1 && <ChevronRightIcon />}
											</div>
										</li>
									))}
								</ol>
								<div className="ml-4 bouncing-loader">
									<div />
									<div />
									<div />
								</div>
							</div>
						);
					})}
				</div>
			)}
		</footer>
	);
}
