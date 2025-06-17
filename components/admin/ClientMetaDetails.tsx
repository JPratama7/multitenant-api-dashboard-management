import React from 'react';
// Read-only details for a single ClientMeta
export default function ClientMetaDetails({ data }: { data: any }) {
  if (!data) return <div>No data</div>;
  return (
    <div className="space-y-2 p-4 border rounded">
      <div><strong>User ID:</strong> {data.userId}</div>
      <div><strong>Approved:</strong> {data.approved ? 'Yes' : 'No'}</div>
      <div><strong>Current Usage:</strong> {data.currentUsage}</div>
      <div><strong>Max Usage:</strong> {data.maxUsage}</div>
      <div><strong>Client Secret:</strong> {data.clientSecret}</div>
      <div><strong>Client Webhook:</strong> {data.clientWebhook}</div>
      {/* TODO: Add more UI or actions as needed */}
    </div>
  );
}
