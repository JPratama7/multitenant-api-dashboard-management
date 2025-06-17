'use client';

import { useState } from 'react';
import { ClientMeta } from '@/lib/types';
import { Button } from '@/components/ui/button';
import ClientMetaForm from '@/components/admin/ClientMetaForm';

interface ClientMetaTableProps {
  data: ClientMeta[];
  onDelete: (id: string) => Promise<void>;
  onToggleApprove: (id: string, approved: boolean) => Promise<void>;
  onFormSubmit: (values: ClientMeta, isEdit: boolean, selectedId?: string) => Promise<void>;
}

export default function ClientMetaTable({
  data,
  onDelete,
  onToggleApprove,
  onFormSubmit,
}: ClientMetaTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<ClientMeta | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  function handleEdit(item: ClientMeta) {
    setSelected(item);
    setIsEdit(true);
    setShowForm(true);
  }

  function handleCreate() {
    setSelected(null);
    setIsEdit(false);
    setShowForm(true);
  }

  async function handleSubmit(values: ClientMeta) {
    await onFormSubmit(values, isEdit, selected?.id);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleCreate}>Create New</Button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Approved</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b text-sm">{item.id}</td>
              <td className="py-2 px-4 border-b text-sm">{item.name}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={item.approved}
                  onChange={() => onToggleApprove(item.id, !item.approved)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[350px]">
            <ClientMetaForm
              initialValues={selected || {}}
              onSubmit={handleSubmit}
              isEdit={isEdit}
            />
            <Button className="mt-2" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
