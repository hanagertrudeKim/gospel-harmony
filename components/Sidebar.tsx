"use client";
import { useState } from "react";
import { HARMONY_SECTIONS, getParentSections, getChildSections } from "@/lib/harmonyData";

interface Props {
  selectedId: number;
  onSelect: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ selectedId, onSelect, isOpen, onClose }: Props) {
  const [expandedParents, setExpandedParents] = useState<Set<number>>(
    new Set([10, Math.floor(selectedId / 10) * 10])
  );

  const handleToggleExpand = (parentId: number) => {
    const newExpanded = new Set(expandedParents);
    if (newExpanded.has(parentId)) {
      newExpanded.delete(parentId);
    } else {
      newExpanded.add(parentId);
    }
    setExpandedParents(newExpanded);
  };

  const handleSelect = (id: number) => {
    onSelect(id);
    onClose();
  };

  const parentSections = getParentSections();

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
          "border-r",
          "transition-transform duration-200 ease-in-out",
          "w-[272px] shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
      >
        {/* Logo */}
        <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-5 sm:pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-start gap-2">
            <span className="font-black text-lg sm:text-xl leading-tight tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>
              Gospel<br />Harmony
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full mt-0.5 shrink-0"
              style={{ backgroundColor: "#FE320A" }}
            />
          </div>
        </div>

        {/* Nav list with hierarchy */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {parentSections.map((parentSection) => {
            const isExpanded = expandedParents.has(parentSection.id);
            const childSections = getChildSections(parentSection.id);
            const isParentSelected = selectedId === parentSection.id;

            return (
              <div key={parentSection.id}>
                {/* Parent section */}
                <button
                  className={`sidebar-item parent w-full text-left flex items-center justify-between ${
                    isParentSelected ? "active" : ""
                  }`}
                  onClick={() => {
                    if (childSections.length === 0) {
                      handleSelect(parentSection.id);
                    } else {
                      handleToggleExpand(parentSection.id);
                    }
                  }}
                >
                  <span className="flex-1">{parentSection.title}</span>
                  <span className="num text-xs">{String(Math.floor(parentSection.id / 10)).padStart(2, "0")}</span>
                  {childSections.length > 0 && (
                    <span
                      className={`transition-transform duration-200 ml-1 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                      style={{ color: 'var(--text-muted)' }}
                    >
                      ›
                    </span>
                  )}
                </button>

                {/* Child sections */}
                {isExpanded && childSections.length > 0 && (
                  <div className="ml-2 border-l pl-2 my-1" style={{ borderColor: 'var(--border-color)' }}>
                    {childSections.map((childSection) => {
                      const isChildSelected = selectedId === childSection.id;
                      return (
                        <button
                          key={childSection.id}
                          className={`sidebar-item child w-full text-left text-sm ${
                            isChildSelected ? "active" : ""
                          }`}
                          onClick={() => handleSelect(childSection.id)}
                        >
                          <span className="flex-1" style={{ color: 'inherit' }}>{childSection.title}</span>
                          <span className="num text-xs">
                            {String(childSection.id).padStart(2, "0")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <style jsx>{`
        .sidebar-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.75rem 0.75rem;
          margin: 0.25rem 0;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: var(--text-secondary);
          transition: all 0.15s ease-in-out;
        }

        .sidebar-item:hover {
          color: var(--text-primary);
        }

        .sidebar-item.active {
          color: var(--accent-color);
          font-weight: 500;
        }

        .sidebar-item.parent {
          font-weight: 500;
          padding: 0.875rem 0.75rem;
        }

        .sidebar-item.child {
          padding: 0.625rem 0.75rem;
        }

        .sidebar-item.child.active {
          color: var(--accent-color);
        }

        .num {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        .sidebar-item.active .num {
          color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
