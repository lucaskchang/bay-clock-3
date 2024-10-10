export default defineEventHandler(async (event) => {
  const { contentfulKey } = useRuntimeConfig(event);
  const result = await $fetch(`
    https://cdn.contentful.com/spaces/a1yze94zh327/environments/master/entries?access_token=${contentfulKey}`,
  );

  event.node.res.setHeader('Cache-Control', 'max-age=10');
  event.node.res.setHeader('CDN-Cache-Control', 'max-age=60');
  event.node.res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');

  return result;
});
