import test from "node:test";
import assert from "node:assert/strict";
import { articles } from "../content.mjs";
import { auditArticles, searchArticles } from "../lib.mjs";

test("visitor search finds helpful guides and excludes drafts", () => {
  assert.deepEqual(searchArticles(articles, { query: "blender leak" }).map((item) => item.id), ["blender-leak"]);
  assert.deepEqual(searchArticles(articles, { category: "Home air", task: "Care" }).map((item) => item.id), ["air-purifier-filter", "humidifier-care"]);
  assert.equal(searchArticles(articles, { query: "vacuum" }).length, 0);
});

test("QA catches release blockers without flagging published content", () => {
  const issues = auditArticles(articles);
  assert.deepEqual(issues.map((issue) => issue.field), ["Metadata", "Image description", "Internal link"]);
  assert(issues.every((issue) => issue.articleId === "draft-vacuum-brush"));
});
