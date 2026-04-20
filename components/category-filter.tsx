"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category =
	| "all"
	| "multiplication"
	| "division"
	| "squares"
	| "addition"
	| "subtraction"
	| "complement";

interface CategoryFilterProps {
	selected: Category;
	onChange: (category: Category) => void;
}

const categories: { value: Category; label: string; icon: string }[] = [
	{ value: "all", label: "All", icon: "∀" },
	{ value: "multiplication", label: "Multiply", icon: "×" },
	{ value: "division", label: "Divide", icon: "÷" },
	{ value: "squares", label: "Squares", icon: "²" },
	{ value: "addition", label: "Add", icon: "+" },
	{ value: "subtraction", label: "Subtract", icon: "-" },
	{ value: "complement", label: "complement", icon: "-" },
];

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{categories.map((cat) => (
				<Button
					key={cat.value}
					variant={selected === cat.value ? "default" : "outline"}
					size="sm"
					onClick={() => onChange(cat.value)}
					className={cn(
						"gap-2",
						selected === cat.value
							? "bg-primary text-primary-foreground"
							: "border-border bg-card text-card-foreground hover:bg-secondary",
					)}
				>
					<span className="text-lg">{cat.icon}</span>
					<span className="hidden sm:inline">{cat.label}</span>
				</Button>
			))}
		</div>
	);
}

export type { Category };
