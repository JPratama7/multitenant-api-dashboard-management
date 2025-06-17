'use server';

import AdminLayout from '@/components/admin/AdminLayout';
import ClientMetaTable from '@/components/admin/ClientMetaTable';
import {ClientMeta} from '@/lib/types';
import {stackServerApp} from "@/stack";
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function AdminClientMetaPage() {
    const user = stackServerApp.useUser({or: 'redirect'})
    if (!user) {
        redirect('/login'); // Redirect to login if user is not authenticated
    }
    console.log(user)

    async function fetchData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/client-meta`, {
            headers: {'x-user-id': user.id},
            cache: 'no-store' // Ensure fresh data on every request
        });
        const json = await res.json();
        return json.data || [];
    }

    const data = await fetchData();
    console.log(data)

    async function handleDelete(id: string) {
        'use server';
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/client-meta?id=${id}`, {
            method: 'DELETE',
            headers: {'x-user-id': user.id},
        });
        revalidatePath('/admin');
    }

    async function handleToggleApprove(id: string, approved: boolean) {
        'use server';
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/client-meta?id=${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'x-user-id': user.id},
            body: JSON.stringify({approved}),
        });
        revalidatePath('/admin');
    }

    async function handleFormSubmit(values: ClientMeta, isEdit: boolean, selectedId?: string) {
        'use server';
        if (isEdit && selectedId) {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/client-meta?id=${selectedId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json', 'x-user-id': user.id},
                body: JSON.stringify(values),
            });
        } else {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/client-meta`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'x-user-id': user.id},
                body: JSON.stringify(values),
            });
        }
        revalidatePath('/admin');
    }

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">ClientMeta Management</h1>
                {/* The create button and form visibility will be handled by a client component */}
            </div>
            {
                <ClientMetaTable
                    data={data}
                    onDelete={handleDelete}
                    onToggleApprove={handleToggleApprove}
                    onFormSubmit={handleFormSubmit}
                />
            }
            {/* TODO: Add view details modal using ClientMetaDetails if needed */}
        </AdminLayout>
    );
}
