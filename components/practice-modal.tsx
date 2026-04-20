"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb, RefreshCw, Trophy } from "lucide-react";
import type { VedicTechnique } from "@/lib/vedic-math";

interface PracticeModalProps {
  technique: VedicTechnique | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Problem {
  question: string;
  answer: number;
  hint: string;
}

export function PracticeModal({ technique, open, onOpenChange }: PracticeModalProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const generateNewProblem = useCallback(() => {
    if (technique) {
      setProblem(technique.generateProblem());
      setUserAnswer("");
      setShowHint(false);
      setResult(null);
    }
  }, [technique]);

  useEffect(() => {
    if (open && technique) {
      generateNewProblem();
      setScore({ correct: 0, total: 0 });
      setStreak(0);
    }
  }, [open, technique, generateNewProblem]);

  const checkAnswer = () => {
    if (!problem) return;

    const isCorrect = parseInt(userAnswer) === problem.answer;
    setResult(isCorrect ? "correct" : "incorrect");
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    setStreak(isCorrect ? streak + 1 : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer && !result) {
      checkAnswer();
    } else if (e.key === "Enter" && result) {
      generateNewProblem();
    }
  };

  if (!technique) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
              वे
            </div>
            <div>
              <DialogTitle className="text-foreground">{technique.name}</DialogTitle>
              <DialogDescription className="font-serif text-primary">
                {technique.sanskrit}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Score: {score.correct}/{score.total}
            </Badge>
            {streak >= 3 && (
              <Badge className="bg-accent text-accent-foreground">
                <Trophy className="mr-1 h-3 w-3" />
                {streak} streak!
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Lightbulb className="mr-1 h-4 w-4" />
            Hint
          </Button>
        </div>

        {showHint && problem && (
          <div className="rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Hint:</strong> {problem.hint}
          </div>
        )}

        <div className="mt-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Solve this problem:</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">
              {problem?.question}
            </p>
          </div>

          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={result !== null}
              className="text-center text-lg"
              autoFocus
            />
            {!result ? (
              <Button onClick={checkAnswer} disabled={!userAnswer} className="px-6">
                Check
              </Button>
            ) : (
              <Button onClick={generateNewProblem} className="px-6">
                <RefreshCw className="mr-2 h-4 w-4" />
                Next
              </Button>
            )}
          </div>

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
        </div>

        <div className="mt-4 rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">{technique.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
