export default defineEventHandler(async (event) => {
  const { contentfulKey } = useRuntimeConfig(event);
  const result = await fetch(`https://cdn.contentful.com/spaces/a1yze94zh327/environments/master/entries?access_token=${contentfulKey}`);
  return result.json();
});
