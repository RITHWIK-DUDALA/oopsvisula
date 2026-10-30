import React from 'react';

export const ReferencePage: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Cheat Sheet & API Guide</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Java 21 OOP Reference Guide</h1>
        <p className="text-xs text-muted-foreground">Quick syntax reference, access modifier visibility rules, and JVM memory layout tables.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-white border border-border rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-foreground">Access Modifiers Visibility Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono">
                  <th className="py-2 px-3">Modifier</th>
                  <th className="py-2 px-3">Same Class</th>
                  <th className="py-2 px-3">Same Package</th>
                  <th className="py-2 px-3">Subclass (Diff Pkg)</th>
                  <th className="py-2 px-3">World (Diff Pkg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                <tr>
                  <td className="py-2 px-3 font-semibold text-foreground">public</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">Yes</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-foreground">protected</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3 text-muted-foreground">No</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-foreground">(default)</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3 text-muted-foreground">No</td>
                  <td className="py-2 px-3 text-muted-foreground">No</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-foreground">private</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3 text-muted-foreground">No</td>
                  <td className="py-2 px-3 text-muted-foreground">No</td>
                  <td className="py-2 px-3 text-muted-foreground">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 bg-white border border-border rounded-xl space-y-3">
          <h2 className="text-sm font-bold text-foreground">Modern Java 21 Syntax Quick Reference</h2>
          <div className="p-4 bg-surface border border-border rounded-lg font-mono text-xs space-y-3">
            <div>
              <span className="text-muted-foreground">// Record declaration (Immutable data carrier)</span>
              <pre className="text-foreground mt-1">public record Point(int x, int y) {}</pre>
            </div>
            <div>
              <span className="text-muted-foreground">// Sealed class hierarchy</span>
              <pre className="text-foreground mt-1">public sealed interface Shape permits Circle, Rectangle {}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

