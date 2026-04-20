"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { TechniqueCard } from "@/components/technique-card";
import { PracticeModal } from "@/components/practice-modal";
import { StatsCard } from "@/components/stats-card";
import { CategoryFilter, type Category } from "@/components/category-filter";
import { vedicTechniques, type VedicTechnique } from "@/lib/vedic-math";
import { BookOpen, Zap, Brain, Target } from "lucide-react";

export default function Home() {
  const [selectedTechnique, setSelectedTechnique] = useState<VedicTechnique | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<Category>("all");

  const handleSelectTechnique = (technique: VedicTechnique) => {
    setSelectedTechnique(technique);
    setModalOpen(true);
  };

  const filteredTechniques =
    categoryFilter === "all"
      ? vedicTechniques
      : vedicTechniques.filter((t) => t.category === categoryFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">
              <Zap className="h-4 w-4 text-primary" />
              Ancient wisdom, modern practice
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-card-foreground md:text-5xl lg:text-6xl">
              Master{" "}
              <span className="text-primary">Vedic Mathematics</span>
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
              Discover the ancient Indian system of mathematics that makes complex calculations 
              simple and fast. Practice with interactive exercises based on the 16 Sutras.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatsCard
              icon={<BookOpen className="h-6 w-6" />}
              label="Techniques"
              value="8"
              description="Core sutras"
            />
            <StatsCard
              icon={<Zap className="h-6 w-6" />}
              label="Speed"
              value="10x"
              description="Faster calculations"
            />
            <StatsCard
              icon={<Brain className="h-6 w-6" />}
              label="Mental Math"
              value="100%"
              description="No calculator needed"
            />
            <StatsCard
              icon={<Target className="h-6 w-6" />}
              label="Accuracy"
              value="High"
              description="With practice"
            />
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Vedic Sutras
              </h2>
              <p className="mt-1 text-muted-foreground">
                Choose a technique to start practicing
              </p>
            </div>
            <CategoryFilter selected={categoryFilter} onChange={setCategoryFilter} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTechniques.map((technique) => (
              <TechniqueCard
                key={technique.id}
                technique={technique}
                onSelect={handleSelectTechnique}
              />
            ))}
          </div>

          {filteredTechniques.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No techniques found for this category.
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border bg-card py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-card-foreground md:text-3xl">
              What is Vedic Mathematics?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Vedic Mathematics is a collection of techniques/sutras to solve mathematical
              problems in an easy and faster way. It was rediscovered from the Vedas between
              1911 and 1918 by Sri Bharati Krishna Tirthaji. The system is based on 16 Sutras
              (formulae) and 13 sub-sutras that can be used for problems in arithmetic,
              algebra, geometry, calculus, and conics.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="rounded-lg bg-secondary px-4 py-2 text-sm text-secondary-foreground">
                <span className="font-bold text-primary">16</span> Main Sutras
              </div>
              <div className="rounded-lg bg-secondary px-4 py-2 text-sm text-secondary-foreground">
                <span className="font-bold text-primary">13</span> Sub-Sutras
              </div>
              <div className="rounded-lg bg-secondary px-4 py-2 text-sm text-secondary-foreground">
                <span className="font-bold text-primary">5000+</span> Years Old
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Learn and practice Vedic Mathematics — the ancient Indian system of mental calculation
          </p>
        </div>
      </footer>

      <PracticeModal
        technique={selectedTechnique}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
