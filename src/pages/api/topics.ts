/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import matter from 'gray-matter';

import { getAllTasksByTopics } from './tasks';

export async function getAllTopicsByModule(moduleSlug) {
  const context = require.context(`../../../_modules`, true, /\.topic.md$/);

  const keysTopics = context
    .keys()
    .filter(key => key.match(`^./${moduleSlug}`));

  const topics = [];

  for (const key of keysTopics) {
    const topic = key.slice(2).replace(`${moduleSlug}/`, '');
    const content = await import(`../../../_modules/${moduleSlug}/${topic}`);
    const meta = matter(content.default);
    topics.push({
      title: meta.data.title,
      slug: meta.data.slug,
      description: meta.data.description,
      image: meta.data.image,
      order: meta.data.order,
      tasks: await getAllTasksByTopics(meta.data.slug)
    });
  }

  return topics;
}

export async function getTopicBySlug(moduleSlug, slug: string) {
  const fileContent = await import(
    `../../../_modules/${moduleSlug}/_topics/${slug}/${slug}.topic.md`
  );

  const meta = matter(fileContent.default);

  return {
    title: meta.data.title,
    slug: meta.data.slug,
    description: meta.data.description,
    image: meta.data.image,
    order: meta.data.order,
    content: meta.content,
    tasks: await getAllTasksByTopics(meta.data.slug)
  };
}
