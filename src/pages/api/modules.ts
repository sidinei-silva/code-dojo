/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import matter from 'gray-matter';

export async function getAllModules() {
  const context = require.context('../../../_modules', true, /\.module.md$/);
  const modules = [];

  for (const key of context.keys()) {
    const module = key.slice(2);
    const content = await import(`../../../_modules/${module}`);
    const meta = matter(content.default);
    modules.push({
      title: meta.data.title,
      slug: meta.data.slug,
      descriptionCard: meta.data.descriptionCard,
      description: meta.data.description,
      image: meta.data.image
    });
  }

  return modules;
}

export async function getModuleBySlug(slug: string) {
  const context = require.context(`../../../_modules`, true, /\.topic.md$/);

  const keysTopics = context.keys().filter(key => key.match(`^./${slug}`));

  const topics = [];

  for (const key of keysTopics) {
    const topic = key.slice(2).replace(`${slug}/`, '');
    const content = await import(`../../../_modules/${slug}/${topic}`);
    const meta = matter(content.default);
    topics.push({
      title: meta.data.title,
      slug: meta.data.slug,
      description: meta.data.description,
      order: meta.data.order
    });
  }

  const fileContent = await import(
    `.../../../_modules/${slug}/${slug}.module.md`
  );

  const meta = matter(fileContent.default);

  return {
    title: meta.data.title,
    description: meta.data.description,
    image: meta.data.image,
    topics
  };
}
