import { Upload, FileText } from "lucide-react";
import { useRef } from "react";

interface Props {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({
  onFileSelect,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Upload size={18} />
        Upload Document
      </button>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.txt,.md,.docx"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onFileSelect(file);
          }
        }}
      />

      <p className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
        <FileText size={16} />
        PDF • DOCX • TXT • Markdown
      </p>
    </div>
  );
}