import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, HelpCircle, Eye, EyeOff, Sparkles } from 'lucide-react';

export interface PracticeChallengeItem {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  hint?: string | null;
}

export interface CodingPromptItem {
  title: string;
  description: string;
  starterCode: string;
  hints: string[];
  solutionCode: string;
}

export interface PracticeChallengeWidgetProps {
  quiz: PracticeChallengeItem[];
  codingPrompt?: CodingPromptItem;
}

export const PracticeChallengeWidget: React.FC<PracticeChallengeWidgetProps> = ({
  quiz,
  codingPrompt,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showSolution, setShowSolution] = useState(false);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const toggleHint = (id: string) => {
    setShowHints((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Award className="w-4 h-4 text-[#075CF5]" />
        <h3 className="text-sm font-bold text-[#17191D]">Concept Self-Assessment & Practice Challenges</h3>
      </div>

      {/* Quizzes / Output Prediction */}
      <div className="space-y-4">
        {quiz.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctOptionIndex;

          return (
            <div
              key={q.id}
              className="p-5 bg-white border border-[#E5E7EB] rounded-2xl space-y-3.5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-mono font-bold text-[#075CF5] bg-[#EFF6FF] px-2 py-0.5 rounded">
                  Challenge {idx + 1}
                </span>
                {q.hint && (
                  <button
                    type="button"
                    onClick={() => toggleHint(q.id)}
                    className="text-[11px] font-mono text-[#64748B] hover:text-[#17191D] flex items-center space-x-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHints[q.id] ? 'Hide Hint' : 'Hint'}</span>
                  </button>
                )}
              </div>

              <h4 className="text-xs sm:text-sm font-semibold text-[#17191D] leading-snug">
                {q.question}
              </h4>

              {q.codeSnippet && (
                <pre className="p-3 bg-[#111111] text-[#F3F4F6] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333]">
                  {q.codeSnippet}
                </pre>
              )}

              {/* Hint Box */}
              {showHints[q.id] && q.hint && (
                <div className="p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl text-xs text-[#C2410C] flex items-start space-x-2">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{q.hint}</span>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  const isThisCorrect = optIdx === q.correctOptionIndex;

                  let optionStyle = 'bg-white border-[#E5E7EB] hover:border-[#CBD5E1] text-[#374151]';
                  if (hasAnswered) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-[#F0FDF4] border-[#86EFAC] text-[#15803D] font-semibold';
                    } else if (isThisSelected) {
                      optionStyle = 'bg-[#FFF5F5] border-[#FEB2B2] text-[#C53030] font-semibold';
                    } else {
                      optionStyle = 'bg-[#FAFAFA] border-[#E5E7EB] text-[#9CA3AF] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && (
                        <span>
                          {isThisCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                          ) : isThisSelected ? (
                            <XCircle className="w-4 h-4 text-[#C53030]" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {hasAnswered && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed border ${
                    isCorrect
                      ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                      : 'bg-[#FFF7ED] border-[#FED7AA] text-[#7C2D12]'
                  }`}
                >
                  <strong className="font-semibold block mb-0.5">
                    {isCorrect ? '✓ Correct Solution' : '✗ Review Required'}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Coding Prompt (Optional) */}
      {codingPrompt && (
        <div className="p-5 bg-white border border-[#E5E7EB] rounded-2xl space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#FF7A00] bg-[#FFF7ED] px-2 py-0.5 rounded">
              Hands-On Code Challenge
            </span>
            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
              className="text-[11px] font-mono text-[#075CF5] hover:underline flex items-center space-x-1"
            >
              {showSolution ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Solution</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Model Solution</span>
                </>
              )}
            </button>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-[#17191D]">
            {codingPrompt.title}
          </h4>
          <p className="text-xs text-[#50566A] leading-relaxed">
            {codingPrompt.description}
          </p>

          <pre className="p-3 bg-[#111111] text-[#F3F4F6] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333]">
            {showSolution ? codingPrompt.solutionCode : codingPrompt.starterCode}
          </pre>

          {codingPrompt.hints && codingPrompt.hints.length > 0 && (
            <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">
                Guiding Hints:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-xs text-[#50566A]">
                {codingPrompt.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
