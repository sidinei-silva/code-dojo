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
  return slug;
}
