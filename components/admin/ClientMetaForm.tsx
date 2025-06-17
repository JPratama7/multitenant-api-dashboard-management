'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ClientMeta } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  userId: z.string().optional(),
  maxUsage: z.number().optional(),
  clientSecret: z.string().optional(),
  clientWebhook: z.string().optional(),
  approved: z.boolean().default(false),
  currentUsage: z.number().optional(),
});

interface ClientMetaFormProps {
  initialValues: Partial<ClientMeta>;
  onSubmit: (values: ClientMeta) => Promise<void>;
  isEdit: boolean;
}

export default function ClientMetaForm({
  initialValues,
  onSubmit,
  isEdit,
}: ClientMetaFormProps) {
  const form = useForm<ClientMeta>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function handleSubmit(values: ClientMeta) {
    await onSubmit(values);
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="userId">User ID</Label>
        <Input id="userId" {...form.register('userId')} />
        {form.formState.errors.userId && (
          <p className="text-red-500 text-sm">{form.formState.errors.userId.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="maxUsage">Max Usage</Label>
        <Input id="maxUsage" type="number" {...form.register('maxUsage')} />
        {form.formState.errors.maxUsage && (
          <p className="text-red-500 text-sm">{form.formState.errors.maxUsage.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="clientSecret">Client Secret</Label>
        <Input id="clientSecret" {...form.register('clientSecret')} />
        {form.formState.errors.clientSecret && (
          <p className="text-red-500 text-sm">{form.formState.errors.clientSecret.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="clientWebhook">Client Webhook</Label>
        <Input id="clientWebhook" {...form.register('clientWebhook')} />
        {form.formState.errors.clientWebhook && (
          <p className="text-red-500 text-sm">{form.formState.errors.clientWebhook.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="approved" {...form.register('approved')} />
        <Label htmlFor="approved">Approved</Label>
      </div>
      {isEdit && (
        <div>
          <Label htmlFor="currentUsage">Current Usage</Label>
          <Input id="currentUsage" type="number" {...form.register('currentUsage')} />
          {form.formState.errors.currentUsage && (
            <p className="text-red-500 text-sm">{form.formState.errors.currentUsage.message}</p>
          )}
        </div>
      )}
      <Button type="submit">{isEdit ? 'Save Changes' : 'Create'}</Button>
    </form>
  );
}
