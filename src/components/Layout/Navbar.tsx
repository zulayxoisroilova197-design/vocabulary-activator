import { BookOpen, Layers, ListChecks, Mic, Sparkles } from "lucide-react";
import type { AppTab } from "@/types";
import { classNames } from "@/lib/utils";

interface NavbarProps {
  activeTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
}

const tabs: Array<{ id: AppTab; label: string; icon: typeof BookOpen }> = [
  { id: "vocabulary", label: "Vocabulary", icon: BookOpen },
  { id: "flashcards", label: "Flashcards", icon: Layers },
  { id: "quiz", label: "Quiz", icon: ListChecks },
  { id: "speaking", label: "Speaking", icon: Mic },
];

export function Navbar({ activeTab, onChangeTab }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Sparkles size={16} strokeWidth={2.25} />
          </div>
          <span className="font-display text-base font-semibold tracking-tight text-ink">
            Vocabulary Activator
          </span>
        </div>

        <nav className="flex items-center gap-1 rounded-xl border border-border bg-surface p-1">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onChangeTab(id)}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  "relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3.5",
                  isActive ? "text-bg" : "text-ink-muted hover:text-ink"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 -z-10 rounded-lg bg-accent" aria-hidden="true" />
                )}
                <Icon size={15} strokeWidth={2.25} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
