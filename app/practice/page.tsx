"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  RefreshCw,
  Trophy,
  Timer,
  Flame,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { vedicTechniques, type VedicTechnique } from "@/lib/vedic-math";

interface Problem {
  question: string;
  answer: number;
  hint: string;
}

export default function PracticePage() {
  const [selectedTechnique, setSelectedTechnique] = useState<VedicTechnique | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timedMode, setTimedMode] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const generateNewProblem = useCallback(() => {
    if (selectedTechnique) {
      setProblem(selectedTechnique.generateProblem());
      setUserAnswer("");
      setShowHint(false);
      setResult(null);
    }
  }, [selectedTechnique]);

  useEffect(() => {
    if (selectedTechnique) {
      generateNewProblem();
    }
  }, [selectedTechnique, generateNewProblem]);

  useEffect(() => {
    if (timedMode && timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timedMode, timeLeft, gameOver]);

  const startTimedMode = () => {
    setTimedMode(true);
    setTimeLeft(60);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setGameOver(false);
    generateNewProblem();
  };

  const checkAnswer = () => {
    if (!problem) return;

    const isCorrect = parseInt(userAnswer) === problem.answer;
    setResult(isCorrect ? "correct" : "incorrect");
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer && !result) {
      checkAnswer();
    } else if (e.key === "Enter" && result) {
      generateNewProblem();
    }
  };

  const handleTechniqueChange = (value: string) => {
    const technique = vedicTechniques.find((t) => t.id === value);
    setSelectedTechnique(technique || null);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setTimedMode(false);
    setGameOver(false);
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Practice Mode</h1>
            <p className="text-muted-foreground">Challenge yourself with Vedic Math problems</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Practice Area */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-card-foreground">Select Technique</CardTitle>
                  <Select onValueChange={handleTechniqueChange}>
                    <SelectTrigger className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Choose a technique" />
                    </SelectTrigger>
                    <SelectContent>
                      {vedicTechniques.map((technique) => (
                        <SelectItem key={technique.id} value={technique.id}>
                          {technique.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {!selectedTechnique ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <span className="text-3xl">वे</span>
                    </div>
                    <h3 className="text-lg font-medium text-card-foreground">
                      Select a Technique to Begin
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Choose from 8 different Vedic Math techniques
                    </p>
                  </div>
                ) : gameOver ? (
                  <div className="py-16 text-center">
                    <Trophy className="mx-auto h-16 w-16 text-primary" />
                    <h3 className="mt-4 text-2xl font-bold text-card-foreground">
                      Time&apos;s Up!
                    </h3>
                    <p className="mt-2 text-lg text-muted-foreground">
                      You solved{" "}
                      <span className="font-bold text-primary">{score.correct}</span> problems
                      correctly
                    </p>
                    <p className="text-muted-foreground">
                      Accuracy: <span className="font-bold">{accuracy}%</span>
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                      <Button onClick={startTimedMode}>Try Again</Button>
                      <Button variant="outline" onClick={() => setGameOver(false)}>
                        Practice Mode
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Technique Info */}
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="font-serif text-sm text-primary">{selectedTechnique.sanskrit}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {selectedTechnique.description}
                      </p>
                    </div>

                    {/* Timer for timed mode */}
                    {timedMode && (
                      <div className="flex items-center gap-4">
                        <Timer className="h-5 w-5 text-primary" />
                        <Progress value={(timeLeft / 60) * 100} className="flex-1" />
                        <span className="text-lg font-bold text-foreground">{timeLeft}s</span>
                      </div>
                    )}

                    {/* Problem Display */}
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">Solve this problem:</p>
                      <p className="mt-4 text-5xl font-bold tracking-tight text-card-foreground md:text-6xl">
                        {problem?.question}
                      </p>
                    </div>

                    {/* Hint */}
                    {showHint && problem && (
                      <div className="rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
                        <strong className="text-foreground">Hint:</strong> {problem.hint}
                      </div>
                    )}

                    {/* Answer Input */}
                    <div className="flex gap-3">
                      <Input
                        type="number"
                        placeholder="Enter your answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={result !== null}
                        className="text-center text-xl"
                        autoFocus
                      />
                      {!result ? (
                        <Button onClick={checkAnswer} disabled={!userAnswer} className="px-8">
                          Check
                        </Button>
                      ) : (
                        <Button onClick={generateNewProblem} className="px-8">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Next
                        </Button>
                      )}
                    </div>

                    {/* Result Display */}
                    {result && (
                      <div
                        className={`flex items-center justify-center gap-2 rounded-lg p-4 ${
                          result === "correct"
                            ? "bg-accent/20 text-accent"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {result === "correct" ? (
                          <>
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-medium">Correct! Well done!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5" />
                            <span className="font-medium">
                              The answer was <strong>{problem?.answer}</strong>
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowHint(!showHint)}
                        className="gap-2"
                      >
                        <Lightbulb className="h-4 w-4" />
                        {showHint ? "Hide Hint" : "Show Hint"}
                      </Button>
                      {!timedMode && (
                        <Button variant="outline" onClick={startTimedMode} className="gap-2">
                          <Timer className="h-4 w-4" />
                          Timed Challenge (60s)
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Score</span>
                  <Badge variant="secondary" className="text-lg">
                    {score.correct}/{score.total}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="text-lg font-bold text-foreground">{accuracy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Flame className="h-4 w-4 text-primary" />
                    Current Streak
                  </span>
                  <span className="text-lg font-bold text-primary">{streak}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Best Streak</span>
                  <Badge className="bg-accent text-accent-foreground">{bestStreak}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                    <span>Press Enter to submit or get next problem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                    <span>Use hints to learn the technique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                    <span>Try timed mode to test your speed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                    <span>Build streaks for motivation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
