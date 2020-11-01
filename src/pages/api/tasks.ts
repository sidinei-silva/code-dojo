/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import matter from 'gray-matter';

export async function getAllTasksByTopics(topicSlug) {
  const context = require.context(`../../../_modules`, true, /\.task.md$/);

  const keysTasks = context.keys().filter(key => key.match(`/${topicSlug}`));
  const tasks = [];

  for (const key of keysTasks) {
    const task = key.slice(2);
    const content = await import(`../../../_modules/${task}`);
    const meta = matter(content.default);
    tasks.push({
      title: meta.data.title,
      description: meta.data.description,
      order: meta.data.order,
      topic: meta.data.topic
    });
  }

  return tasks;
}

export async function getTaskBySlug(topicSlug, slug: string) {
  const context = require.context(`../../../_modules`, true, /\.task.md$/);

  const keysTasks = context
    .keys()
    .filter(key => key.match(`/${topicSlug}/tasks/${slug}`));

  const pathTask = keysTasks[0].slice(2);

  const fileContent = await import(`../../../_modules/${pathTask}`);

  const meta = matter(fileContent.default);

  return {
    title: meta.data.title,
    description: meta.data.description,
    order: meta.data.order,
    topic: meta.data.topic
  };
}
