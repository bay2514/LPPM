import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newsSchema, collaboratorSchema } from "@admin/content/schema.js";
import { useAdminContent } from "@admin/hooks/useAdminContent.js";
import ContentList from "@admin/components/content/ContentList.jsx";
import ContentForm from "@admin/components/content/ContentForm.jsx";

const schemaMap = {
  news: newsSchema,
  collaborators: collaboratorSchema,
};

export default function ContentManagerPage() {
  const { schemaKey: rawKey } = useParams();
  const navigate = useNavigate();
  
  // Normalisasi key (berita -> news, mitra -> collaborators)
  const schemaKey = rawKey === "berita" ? "news" : rawKey === "mitra" ? "collaborators" : rawKey;
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
        Skema tidak ditemukan untuk key: <strong>{schemaKey}</strong>
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
    // Kembali ke list jika sedang edit
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
