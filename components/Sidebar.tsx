"use client";
import { HARMONY_SECTIONS, getParentSections, getChildSections } from "@/lib/harmonyData";

interface Props {
  selectedId: number;
  onSelect: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ selectedId, onSelect, isOpen, onClose }: Props) {
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
            <span className="font-black text-base sm:text-lg leading-tight tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>
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
            const childSections = getChildSections(parentSection.id);
            const isParentSelected = selectedId === parentSection.id;

            return (
              <div key={parentSection.id}>
                {/* Parent section */}
                <button
                  className={`sidebar-item parent w-full text-left flex items-center justify-between ${
                    isParentSelected ? "active" : ""
                  }`}
                  onClick={() => handleSelect(parentSection.id)}
                >
                  <span className="flex-1">{parentSection.title}</span>
                  <span className="num text-xs">{String(Math.floor(parentSection.id / 10)).padStart(2, "0")}</span>
                  <span
                    className="ml-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    ›
                  </span>
                </button>

                {/* Child sections - always visible */}
                {childSections.length > 0 && (
                  <div className="my-1">
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
                            {String(childSection.id).padStart(3, "0")}
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
          background-color: rgba(124, 58, 237, 0.05);
        }

        .sidebar-item.active {
          color: var(--accent-color);
          font-weight: 500;
        }

        .sidebar-item.parent {
          font-weight: 600;
          font-size: 0.95rem;
          padding: 1rem 0.75rem;
          color: var(--text-primary);
        }

        .sidebar-item.parent:hover {
          color: var(--text-primary);
        }

        .sidebar-item.parent.active {
          color: var(--accent-color);
          font-weight: 600;
        }

        .sidebar-item.child {
          padding: 0.625rem 1.25rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .sidebar-item.child:hover {
          color: var(--text-primary);
        }

        .sidebar-item.child.active {
          color: var(--accent-color);
          font-weight: 500;
        }

        .num {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        .sidebar-item.active .num {
          color: var(--accent-color);
        }
      `}</style>
    </>
  );
}
