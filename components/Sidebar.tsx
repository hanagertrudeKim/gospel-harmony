"use client";
import { HARMONY_SECTIONS } from "@/lib/harmonyData";

interface Props {
  selectedId: number;
  onSelect: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ selectedId, onSelect, isOpen, onClose }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed lg:relative z-30 lg:z-auto",
          "flex flex-col h-full",
          "bg-[#EFEAE3] border-r border-black/10",
          "transition-transform duration-200 ease-in-out",
          "w-[272px] shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="px-4 pt-5 pb-6 border-b border-black/10">
          <div className="flex items-start gap-2">
            <span className="font-black text-xl leading-tight tracking-tight uppercase">
              Gospel<br />Harmony
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full mt-0.5 shrink-0"
              style={{ backgroundColor: "#FE320A" }}
            />
          </div>
        </div>

        {/* Nav list */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {HARMONY_SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`sidebar-item w-full text-left ${selectedId === s.id ? "active" : ""}`}
              onClick={() => { onSelect(s.id); onClose(); }}
            >
              <span>{s.title}</span>
              <span className="num">{String(s.id).padStart(2, "0")}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
