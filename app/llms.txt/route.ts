import { getLlmsTxt } from '~/lib/llms';

export const dynamic = 'force-static';

export const GET = () => new Response(getLlmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
