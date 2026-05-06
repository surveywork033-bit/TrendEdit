import { FilterTabs } from "@/components/FilterTabs";
import { SearchBar } from "@/components/SearchBar";
import { TemplateCard } from "@/components/TemplateCard";
import { UploadModal } from "@/components/UploadModal";
import { useTemplateStore } from "@/store/useTemplateStore";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const {
    activeFilter,
    searchQuery,
    isUploadModalOpen,
    selectedTemplate,
    setActiveFilter,
    setSearchQuery,
    openUploadModal,
    closeUploadModal,
    filteredTemplates,
  } = useTemplateStore();

  const shown = filteredTemplates();
  const isEmpty = shown.length === 0;

  return (
    <>
      {/* ── Search + Filters ── */}
      <section
        className="px-4 pt-6 pb-2"
        style={{ background: "oklch(0.07 0.01 261)" }}
        data-ocid="home.search_section"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Full-width search bar */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Filter tabs row */}
          <div
            className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b"
            style={{ borderColor: "oklch(0.20 0.01 265 / 0.5)" }}
          >
            <FilterTabs active={activeFilter} onChange={setActiveFilter} />
            <span className="text-xs" style={{ color: "oklch(0.45 0.01 260)" }}>
              {shown.length} template{shown.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── Template Grid ── */}
      <section
        className="px-4 pb-20 pt-6"
        style={{ background: "oklch(0.07 0.01 261)" }}
        data-ocid="home.gallery_section"
      >
        <div className="max-w-7xl mx-auto">
          {/* Grid */}
          <div className="mt-6">
            {/* Empty state */}
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
                data-ocid="home.empty_state"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.14 0.015 265)",
                    border: "1px solid oklch(0.28 0.02 265 / 0.4)",
                  }}
                >
                  <Sparkles
                    className="w-7 h-7"
                    style={{ color: "oklch(0.50 0.01 260)" }}
                  />
                </div>
                <p
                  className="font-display font-medium text-sm"
                  style={{ color: "oklch(0.60 0.01 260)" }}
                >
                  No templates match your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-smooth"
                  style={{
                    background: "oklch(0.68 0.28 264 / 0.1)",
                    color: "oklch(0.68 0.28 264)",
                    border: "1px solid oklch(0.68 0.28 264 / 0.3)",
                  }}
                  data-ocid="home.empty_state.reset_button"
                >
                  Clear filters
                </button>
              </motion.div>
            )}

            {/* Template grid */}
            {!isEmpty && (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {shown.map((template, i) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      index={i}
                      onClick={openUploadModal}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Upload Modal ── */}
      <AnimatePresence>
        {isUploadModalOpen && selectedTemplate && (
          <UploadModal template={selectedTemplate} onClose={closeUploadModal} />
        )}
      </AnimatePresence>
    </>
  );
}
