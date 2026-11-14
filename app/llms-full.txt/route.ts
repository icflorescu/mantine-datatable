import { getLlmsFullTxt } from '~/lib/llms';

export const dynamic = 'force-static';

export const GET = async () =>
  new Response(await getLlmsFullTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
