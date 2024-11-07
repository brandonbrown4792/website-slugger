import { supabase } from '@/utils/supabase/client';

import shortid from 'shortid';

export async function createShortLink(url: string) {
  let slug = shortid.generate();
  let invalidSlug = true;

  while (invalidSlug) {
    const slugLookupResponse = await supabase
      .from('website_slugs')
      .select('slug')
      .eq('slug', slug)
      .single();
    invalidSlug = slugLookupResponse.data?.slug === slug;
  }

  const response = await supabase
    .from('website_slugs')
    .insert({
      url,
      slug,
    })
    .select('url, slug')
    .single();

  return response;
}

export async function fetchUrlFromSlug(slug: string) {
  const response = await supabase
    .from('website_slugs')
    .select('url')
    .eq('slug', slug)
    .single();
  return response;
}
