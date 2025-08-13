import { ListCheck, Search, SquarePen } from "lucide-react";

import { Label } from "#/components/ui/label";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarInput,
} from "#/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
	return (
		<form className="flex flex-col gap-2" {...props}>
			<div className="flex gap-2 items-center">
				<Avatar className="size-6">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<SidebarGroup className="p-0">
					<SidebarGroupContent className="relative flex items-center">
						<Label htmlFor="search" className="sr-only">
							Search
						</Label>

						<SidebarInput
							className="pl-7 rounded-full text-xs"
							placeholder="Search"
							id="search"
						/>

						<Search className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 opacity-50 select-none" />
					</SidebarGroupContent>
				</SidebarGroup>

				<button
					className="size-7 rounded-full flex items-center justify-center border border-input flex-none bg-background button-hover"
					type="button"
				>
					<SquarePen className="size-3 stroke-accent" />
				</button>
			</div>

			<div className="flex items-center gap-2">
				<button
					className="size-6 rounded-full flex items-center justify-center bg-accent button-hover"
					type="button"
				>
					<ListCheck className="size-4 stroke-accent-foreground pl-0.5" />
				</button>

				<Avatar className="size-6">
					<AvatarImage src="https://github.com/evilrabbit.png" alt="@shadcn" />

					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<Avatar className="size-6">
					<AvatarImage src="https://github.com/leerob.png" alt="@shadcn" />

					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</form>
	);
}
