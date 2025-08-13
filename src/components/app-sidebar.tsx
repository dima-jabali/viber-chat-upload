import { Plus } from "lucide-react";

import { SearchForm } from "#/components/search-form";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarRail,
} from "#/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { botUser } from "#/lib/fake-users";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SearchForm />
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup className="gap-3">
					<SidebarGroupLabel>Chats</SidebarGroupLabel>

					<div className="flex gap-1.5">
						<button
							className="rounded-full flex items-center justify-center border border-accent px-4 text-xs py-1 bg-background button-hover"
							type="button"
						>
							All
						</button>

						<button
							className="rounded-full flex whitespace-nowrap items-center gap-2 justify-center border border-input px-4 text-xs py-1 bg-background button-hover"
							type="button"
						>
							<span>Friends</span>
						</button>

						<button
							className="rounded-full flex items-center whitespace-nowrap gap-2 justify-center border border-input px-4 text-xs py-1 bg-background button-hover"
							type="button"
						>
							<span>Family</span>
						</button>

						<button
							className="rounded-full flex size-6.5 items-center justify-center border border-input aspect-square bg-background button-hover"
							type="button"
						>
							<Plus className="size-4 stroke-accent" />
						</button>
					</div>

					<SidebarGroupContent>
						<SidebarMenu>
							<button
								className="button-hover flex items-center gap-2 py-2 rounded-lg bg-accent/15 px-2"
								type="button"
							>
								<Avatar className="size-10">
									<AvatarImage src={botUser.image} alt="@shadcn" />

									<AvatarFallback>CN</AvatarFallback>
								</Avatar>

								<div className="flex flex-col items-start gap-0 w-full">
									<div className="w-full flex items-center justify-between">
										<span>LOAN</span>

										<span className="text-muted-foreground text-xs opacity-70">
											09:26
										</span>
									</div>

									<p className="text-muted-foreground text-xs">Loan</p>
								</div>
							</button>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
