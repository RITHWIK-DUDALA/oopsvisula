import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export interface CommonMistakeItem {
  headline: string;
  incorrectSnippet: string;
  errorMessage?: string;
  explanation: string;
  correctedSnippet: string;
  whyCorrectionWorks: string;
}

export interface CommonMistakesCardProps {
  mistakes: CommonMistakeItem[];
  title?: string;
}

/**
 * CommonMistakesCard Component
 * Displays real Java 21 compiler errors, runtime exceptions, and antipatterns:
 * - Red-tinted incorrect snippet with error badge
 * - Green-tinted corrected snippet with technical rationale
 */
export const CommonMistakesCard: React.FC<CommonMistakesCardProps> = ({
  mistakes,
  title = 'Common Compiler Pitfalls & Mistakes',
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-[#C2410C]" />
        <h3 className="text-sm font-bold text-[#17191D]">{title}</h3>
      </div>

      <div className="space-y-6">
        {mistakes.map((m, idx) => (
          <div
            key={idx}
            className="p-5 bg-white border border-[#E5E7EB] rounded-2xl space-y-4 shadow-2xs"
          >
            <h4 className="text-xs sm:text-sm font-bold text-[#17191D]">
              {idx + 1}. {m.headline}
            </h4>

            {/* Split Comparison: Incorrect vs Correct */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Incorrect Column */}
              <div className="p-3.5 bg-[#FFF5F5] border border-[#FED7D7] rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#C53030]">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Incorrect Code (Compilation/Runtime Defect)</span>
                </div>
                <pre className="p-3 bg-[#1A1A1A] text-[#FEB2B2] rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
                  {m.incorrectSnippet}
                </pre>
                {m.errorMessage && (
                  <div className="text-[10px] font-mono text-[#9B2C2C] bg-white/70 p-2 rounded border border-[#FEB2B2]">
                    <span className="font-bold">javac error:</span> {m.errorMessage}
                  </div>
                )}
                <p className="text-xs text-[#742A2A] leading-relaxed">
                  {m.explanation}
                </p>
              </div>

              {/* Correct Column */}
              <div className="p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#15803D]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Corrected Java 21 Code</span>
                </div>
                <pre className="p-3 bg-[#1A1A1A] text-[#86EFAC] rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
                  {m.correctedSnippet}
                </pre>
                <p className="text-xs text-[#166534] leading-relaxed">
                  {m.whyCorrectionWorks}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

