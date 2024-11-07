'use client';

import { useState } from 'react';
import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createShortLink } from '@/database/url';
import Link from 'next/link';

export default function ShortUrlForm() {
  const [validSlug, setValidSlug] = useState<string | null>(null);
  const hostUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;

  const form = useForm({
    initialValues: {
      url: '',
    },

    validate: {
      url: (value) =>
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(
          value
        )
          ? null
          : 'Invalid URL',
    },
  });

  async function handleMakeUrl(url: string) {
    const { data } = await createShortLink(url);
    setValidSlug(`${hostUrl}/${data?.slug}`);
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleMakeUrl(values.url))}>
      <Stack>
        <TextInput label='URL' {...form.getInputProps('url')} />
        <Button type='submit'>Submit</Button>
        <Stack>
          {validSlug && (
            <Link href={validSlug} target='_blank'>
              {validSlug}
            </Link>
          )}
        </Stack>
      </Stack>
    </form>
  );
}
