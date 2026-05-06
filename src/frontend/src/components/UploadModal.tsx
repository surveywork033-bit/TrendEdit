import type { Template } from "@/types/template";
import { Sparkles, Upload, Wand2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

type ModalState = "idle" | "uploading" | "processing" | "result";

interface UploadModalProps {
  template: Template;
  onClose: () => void;
}

export function UploadModal({ template, onClose }: UploadModalProps) {
  const [state, setState] = useState<ModalState>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setState("uploading");
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setState("idle");
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleProcess() {
    if (!preview) return;
    setState("processing");
    setTimeout(() => {
      setResult(preview);
      setState("result");
    }, 2500);
  }

  function handleReset() {
    setPreview(null);
    setResult(null);
    setState("idle");
  }

  const isProcessing = state === "processing";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "oklch(0.05 0.01 261 / 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-ocid="upload.dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.11 0.015 265)",
          border: "1px solid oklch(0.28 0.03 265 / 0.5)",
          boxShadow:
            "0 30px 90px oklch(0.05 0.01 261 / 0.9), 0 0 0 1px oklch(0.35 0.04 265 / 0.1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-5 py-4 border-b"
          style={{ borderColor: "oklch(0.22 0.02 265 / 0.4)" }}
        >
          <div className="min-w-0 pr-3">
            <h2
              className="font-display font-semibold text-base truncate"
              style={{ color: "oklch(0.94 0.02 240)" }}
            >
              {template.title}
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.58 0.01 260)" }}
            >
              Apply this AI template to your photo
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg transition-smooth hover:opacity-70 shrink-0"
            style={{ color: "oklch(0.55 0.01 260)" }}
            aria-label="Close modal"
            data-ocid="upload.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Prompt chip */}
          <div
            className="px-3 py-2.5 rounded-xl text-xs leading-relaxed"
            style={{
              background: "oklch(0.68 0.28 264 / 0.07)",
              border: "1px solid oklch(0.68 0.28 264 / 0.18)",
              color: "oklch(0.75 0.08 230)",
            }}
          >
            <span
              className="font-semibold"
              style={{ color: "oklch(0.72 0.27 200)" }}
            >
              Prompt:{" "}
            </span>
            {template.prompt}
          </div>

          {/* Drop zone / preview / result */}
          <AnimatePresence mode="wait">
            {state !== "result" && (
              <motion.button
                key="dropzone"
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="relative w-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-smooth"
                style={{
                  minHeight: "180px",
                  borderColor: dragOver
                    ? "oklch(0.68 0.28 264 / 0.8)"
                    : preview
                      ? "oklch(0.68 0.28 264 / 0.45)"
                      : "oklch(0.28 0.02 265 / 0.5)",
                  background: dragOver
                    ? "oklch(0.68 0.28 264 / 0.06)"
                    : preview
                      ? "transparent"
                      : "oklch(0.15 0.01 265 / 0.4)",
                  boxShadow: dragOver
                    ? "0 0 20px oklch(0.68 0.28 264 / 0.15)"
                    : "none",
                }}
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                data-ocid="upload.dropzone"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="selected preview"
                    className="w-full h-full object-cover rounded-xl"
                    style={{ maxHeight: "220px" }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2.5 py-10">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "oklch(0.20 0.02 265 / 0.6)",
                        border: "1px solid oklch(0.32 0.02 265 / 0.5)",
                      }}
                    >
                      <Upload
                        className="w-5 h-5"
                        style={{ color: "oklch(0.60 0.10 230)" }}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.72 0.02 240)" }}
                      >
                        Click or drag your photo here
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.48 0.01 260)" }}
                      >
                        PNG, JPG, WEBP — up to 20 MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && handleFile(e.target.files[0])
                  }
                  data-ocid="upload.input"
                />
              </motion.button>
            )}

            {state === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-2.5"
                data-ocid="upload.success_state"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "oklch(0.55 0.20 142 / 0.2)",
                      border: "1px solid oklch(0.55 0.20 142 / 0.4)",
                      color: "oklch(0.68 0.20 142)",
                    }}
                  >
                    ✓
                  </div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "oklch(0.68 0.20 142)" }}
                  >
                    Template applied successfully!
                  </p>
                </div>
                <img
                  src={result}
                  alt="result"
                  className="w-full rounded-xl object-cover"
                  style={{
                    maxHeight: "260px",
                    border: "1px solid oklch(0.30 0.02 265 / 0.5)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing animation */}
          {isProcessing && (
            <div
              className="flex items-center justify-center gap-3 py-3"
              data-ocid="upload.loading_state"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Wand2
                  className="w-5 h-5"
                  style={{ color: "oklch(0.68 0.28 264)" }}
                />
              </motion.div>
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.75 0.08 230)" }}
              >
                Processing…
              </span>
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "oklch(0.68 0.28 264)" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            {state === "result" ? (
              <>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-smooth"
                  style={{
                    background: "oklch(0.18 0.01 265 / 0.6)",
                    color: "oklch(0.65 0.01 260)",
                    border: "1px solid oklch(0.28 0.01 265 / 0.5)",
                  }}
                  data-ocid="upload.cancel_button"
                >
                  Try Another
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-smooth"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.28 264), oklch(0.60 0.20 220))",
                    color: "oklch(0.98 0.01 0)",
                    boxShadow: "0 0 20px oklch(0.68 0.28 264 / 0.3)",
                  }}
                  data-ocid="upload.confirm_button"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-smooth"
                  style={{
                    background: "oklch(0.18 0.01 265 / 0.6)",
                    color: "oklch(0.65 0.01 260)",
                    border: "1px solid oklch(0.28 0.01 265 / 0.5)",
                  }}
                  data-ocid="upload.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleProcess}
                  disabled={!preview || isProcessing}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth disabled:opacity-50"
                  style={{
                    background:
                      preview && !isProcessing
                        ? "linear-gradient(135deg, oklch(0.68 0.28 264), oklch(0.60 0.20 220))"
                        : "oklch(0.28 0.02 265)",
                    color: "oklch(0.98 0.01 0)",
                    boxShadow:
                      preview && !isProcessing
                        ? "0 0 20px oklch(0.68 0.28 264 / 0.3)"
                        : "none",
                  }}
                  data-ocid="upload.submit_button"
                >
                  <Sparkles className="w-4 h-4" />
                  {isProcessing ? "Processing…" : "Apply Template"}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
