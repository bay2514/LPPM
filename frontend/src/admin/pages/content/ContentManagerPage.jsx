import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  newsSchema,
  collaboratorSchema,
  eventsSchema,
  documentsSchema,
} from "@admin/content/schema.js";
import { useAdminContent } from "@admin/hooks/useAdminContent.js";
import ContentList from "@admin/components/content/ContentList.jsx";
import ContentForm from "@admin/components/content/ContentForm.jsx";

const schemaMap = {
  news: newsSchema,
  collaborators: collaboratorSchema,
  events: eventsSchema,
  documents: documentsSchema,
};

const pathToKey = {
  berita: "news",
  mitra: "collaborators",
  kegiatan: "events",
  dokumen: "documents",
};

export default function ContentManagerPage() {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").filter(Boolean)[1] || "";
  const schemaKey = pathToKey[pathSegment] || pathSegment;
  const schema = schemaMap[schemaKey];

  const {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
    duplicateItem,
    getVersions,
    restoreVersion,
  } = useAdminContent(schemaKey);

  const [view, setView] = useState("list"); // 'list' | 'create' | 'edit'
  const [editingItem, setEditingItem] = useState(null);

  if (!schema) {
    return (
      <div className="p-8 text-center text-ink-500">
        Skema tidak ditemukan untuk path: <strong>{pathSegment}</strong>
      </div>
    );
  }

  const handleAdd = () => {
    setEditingItem(null);
    setView("create");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setView("edit");
  };

  const handleDelete = (id) => {
    deleteItem(id);
    if (view === "edit" && editingItem?.id === id) {
      setView("list");
      setEditingItem(null);
    }
  };

  const handleSubmit = (formData) => {
    if (view === "edit" && editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      createItem(formData);
    }
    setView("list");
    setEditingItem(null);
  };

  const handleCancel = () => {
    setView("list");
    setEditingItem(null);
  };

  const handleDuplicate = (id) => {
    duplicateItem(id);
  };

  const versions = editingItem ? getVersions(editingItem.id) : [];

  return (
    <div className="mx-auto max-w-7xl">
      {view === "list" && (
        <ContentList
          schema={schema}
          items={items}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onViewVersions={(item) => {
            setEditingItem(item);
            setView("edit");
          }}
        />
      )}

      {(view === "create" || view === "edit") && (
        <ContentForm
          schema={schema}
          initialData={editingItem || {}}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          versions={versions}
          onRollback={(versionIndex) => {
            if (editingItem) {
              restoreVersion(editingItem.id, versionIndex);
              setView("list");
              setEditingItem(null);
            }
          }}
        />
      )}
    </div>
  );
}
