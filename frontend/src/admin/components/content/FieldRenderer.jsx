import React from "react";
import Input from "@shared/components/ui/Input.jsx";
import Textarea from "@shared/components/ui/Textarea.jsx";
import RichTextEditor from "./RichTextEditor.jsx";

/**
 * FieldRenderer memetakan tipe field di skema ke komponen UI yang sesuai.
 */
export default function FieldRenderer({ field, value, onChange, error }) {
  const handleChange = (e) => {
    const val = e.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e;
    onChange(field.name, val);
  };

  const commonProps = {
    label: field.label,
    placeholder: field.placeholder,
    helpText: field.helpText,
    error: error,
    required: field.required,
    value: value || field.defaultValue || "",
    onChange: handleChange,
  };

  switch (field.type) {
    case "text":
    case "url":
    case "email":
    case "slug":
      return <Input type={field.type === "slug" ? "text" : field.type} {...commonProps} />;

    case "number":
      return <Input type="number" {...commonProps} value={value ?? field.defaultValue ?? 0} />;

    case "textarea":
      return <Textarea rows={field.rows || 4} {...commonProps} />;

    case "richtext":
      return (
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-navy-800">
            {field.label} {field.required && <span className="text-orange-600">*</span>}
          </label>
          <RichTextEditor
            value={value || ""}
            onChange={(val) => onChange(field.name, val)}
            placeholder={field.placeholder}
          />
          {field.helpText && <p className="text-xs text-ink-500">{field.helpText}</p>}
          {error && <p className="text-xs text-orange-600">{error}</p>}
        </div>
      );

    case "select":
      return (
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-navy-800">
            {field.label} {field.required && <span className="text-orange-600">*</span>}
          </label>
          <select
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-navy-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            value={value || field.defaultValue || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {field.helpText && <p className="text-xs text-ink-500">{field.helpText}</p>}
          {error && <p className="text-xs text-orange-600">{error}</p>}
        </div>
      );

    case "date":
      return <Input type="date" {...commonProps} />;

    case "datetime":
      return <Input type="datetime-local" {...commonProps} />;

    case "toggle":
      return (
        <div className="flex items-center space-x-3 py-2">
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-offset-2 focus:ring-2 focus:ring-orange-500 ${
              value ? "bg-orange-600" : "bg-ink-200"
            }`}
            onClick={() => onChange(field.name, !value)}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                value ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-navy-800">{field.label}</span>
        </div>
      );

    case "image":
      return (
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-navy-800">
            {field.label} {field.required && <span className="text-orange-600">*</span>}
          </label>
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-line bg-canvas">
              {value ? (
                <img src={value} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-ink-400">
                  No Image
                </div>
              )}
            </div>
            <Input
              type="text"
              placeholder="URL Gambar..."
              value={value || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="flex-1"
            />
          </div>
          {field.helpText && <p className="text-xs text-ink-500">{field.helpText}</p>}
        </div>
      );

    default:
      return (
        <div className="rounded-lg bg-orange-50 p-3 text-xs text-orange-800">
          Field type <strong>{field.type}</strong> belum didukung.
        </div>
      );
  }
}
