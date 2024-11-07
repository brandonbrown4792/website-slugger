import { fetchUrlFromSlug } from '@/database/url';
import { NextPageContext } from 'next';
import { notFound, redirect, RedirectType } from 'next/navigation';

export default async function SlugPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data } = await fetchUrlFromSlug(slug);

  if (!data || !data.url) {
    notFound();
  }

  const url = data.url;
  const cleanUrl =
    !url.startsWith('http://') && !url.startsWith('https://')
      ? `http://${url}`
      : url;

  redirect(cleanUrl);
}
