export function searchArticles(articles, { query = "", category = "All", task = "All" } = {}) {
  const normalized = query.trim().toLocaleLowerCase();
  return articles.filter((article) => article.status === "published")
    .filter((article) => category === "All" || article.category === category)
    .filter((article) => task === "All" || article.task === task)
    .filter((article) => !normalized || [article.title, article.summary, article.category, article.task, ...article.keywords]
      .join(" ").toLocaleLowerCase().includes(normalized));
}

export function auditArticles(articles) {
  const knownIds = new Set(articles.map((article) => article.id));
  const issues = [];
  for (const article of articles) {
    if (!article.metaDescription?.trim()) {
      issues.push({ articleId: article.id, field: "Metadata", message: "Missing search description" });
    }
    if (article.image && !article.image.alt?.trim()) {
      issues.push({ articleId: article.id, field: "Image description", message: "Image is missing meaningful alternative text" });
    }
    for (const target of article.relatedIds || []) {
      if (!knownIds.has(target) || articles.find((item) => item.id === target)?.status !== "published") {
        issues.push({ articleId: article.id, field: "Internal link", message: `Related guide “${target}” has no published target` });
      }
    }
  }
  return issues;
}
