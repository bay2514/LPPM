import React, { useState } from "react";
import DOMPurify from "dompurify";

/**
 * RichTextEditor sederhana dengan toolbar inline (bold, italic, heading, list, link).
 * Hasil di-sanitasi dengan DOMPurify untuk mencegah XSS.
 */
export default function RichTextEditor({ value, onChange, placeholder }) {
  const [focus, setFocus] = useState(false);

  const insertFormat = (command, valueArg = null) => {
    document.execCommand(command, false, valueArg);
    onChange(getContent());
    // Fokus kembali setelah format
    editorRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt("Masukkan URL:");
    if (url) {
      insertFormat("createLink", url);
    }
  };

  const insertHeading = (level) => {
    insertFormat("formatBlock", `h${level}`);
  };

  const getContent = () => {
    return editorRef.current ? editorRef.current.innerHTML : "";
  };

  const editorRef = React.useRef(null);

  // Set content saat mount / update
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div
      className={`rounded-lg border transition-shadow ${focus ? "border-orange-500 ring-1 ring-orange-500" : "border-line"} bg-white`}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-line bg-navy-50/50 px-2 py-1.5">
        <button
          type="button"
          onClick={() => insertHeading(2)}
          className="rounded px-2 py-1 text-xs font-medium text-navy-700 hover:bg-navy-100"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertHeading(3)}
          className="rounded px-2 py-1 text-xs font-medium text-navy-700 hover:bg-navy-100"
          title="Heading 3"
        >
          H3
        </button>
        <div className="mx-1 h-4 w-px bg-line" />
        <button
          type="button"
          onClick={() => insertFormat("bold")}
          className={`rounded px-2 py-1 text-xs font-bold text-navy-700 hover:bg-navy-100 ${value.includes("<b>") || value.includes("<strong>") ? "bg-orange-50 text-orange-700" : ""}`}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => insertFormat("italic")}
          className={`rounded px-2 py-1 text-xs font italic text-navy-700 hover:bg-navy-100 ${value.includes("<i>") || value.includes("<em>") ? "bg-orange-50 text-orange-700" : ""}`}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertFormat("insertUnorderedList")}
          className="rounded px-2 py-1 text-xs font-medium text-navy-700 hover:bg-navy-100"
          title="List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={insertLink}
          className="rounded px-2 py-1 text-xs font-medium text-navy-700 hover:bg-navy-100"
          title="Link"
        >
          Link
        </button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={`min-h-[200px] w-full p-3 text-sm text-ink-800 outline-none ${focus ? "ring-2 ring-orange-500/20" : ""}`}
        placeholder={placeholder}
        onInput={() => {
          const content = editorRef.current.innerHTML;
          onChange(DOMPurify.sanitize(content, { ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "a"], ALLOWED_ATTR: ["href", "target"] }));
        }}
      />
    </div>
  );
}
