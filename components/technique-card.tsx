"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { VedicTechnique } from "@/lib/vedic-math";

interface TechniqueCardProps {
  technique: VedicTechnique;
  onSelect: (technique: VedicTechnique) => void;
}

const difficultyColors = {
  beginner: "bg-accent text-accent-foreground",
  intermediate: "bg-primary/20 text-primary",
  advanced: "bg-destructive/20 text-destructive",
};

const categoryIcons = {
  multiplication: "×",
  division: "÷",
  squares: "²",
  addition: "+",
  subtraction: "−",
};

export function TechniqueCard({ technique, onSelect }: TechniqueCardProps) {
  return (
    <Card
      className="group cursor-pointer border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
      onClick={() => onSelect(technique)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-2xl font-bold text-secondary-foreground">
            {categoryIcons[technique.category]}
          </div>
          <Badge className={difficultyColors[technique.difficulty]} variant="secondary">
            {technique.difficulty}
          </Badge>
        </div>
        <CardTitle className="mt-3 text-lg text-card-foreground">{technique.name}</CardTitle>
        <p className="font-serif text-sm text-primary">{technique.sanskrit}</p>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{technique.description}</CardDescription>
        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Start practicing
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
