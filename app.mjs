import { articles } from "./content.mjs";
import { searchArticles, auditArticles } from "./lib.mjs";

const $ = (selector) => document.querySelector(selector);
const byId = new Map(articles.map((article) => [article.id, article]));
const issues = auditArticles(articles);
let focusSearchAfterRoute = false;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function populateFilters() {
  for (const [selector, key] of [["#category", "category"], ["#task", "task"]]) {
    const select = $(selector);
    for (const value of [...new Set(articles.filter((item) => item.status === "published").map((item) => item[key]))].sort()) {
      const option = document.createElement("option");
      option.value = option.textContent = value;
      select.append(option);
    }
  }
}

function renderCards() {
  const results = searchArticles(articles, { query: $("#search").value, category: $("#category").value, task: $("#task").value });
  $("#result-count").textContent = `${results.length} ${results.length === 1 ? "guide" : "guides"} found`;
  $("#cards").innerHTML = results.map((article, index) => `<a class="guide-card" href="#guide/${encodeURIComponent(article.id)}">
    <div class="card-top"><span class="card-number">${String(index + 1).padStart(2, "0")}</span><span class="card-time">${article.minutes} min read</span></div>
    <div><span class="category-tag">${escapeHtml(article.category)}</span><h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(article.summary)}</p></div>
    <div class="card-bottom"><span>${escapeHtml(article.task)}</span><span class="arrow" aria-hidden="true">↗</span></div>
  </a>`).join("");
  $("#empty-state").hidden = results.length > 0;
}

function renderGuide(id) {
  const article = byId.get(id);
  if (!article || article.status !== "published") return false;
  const related = article.relatedIds.map((relatedId) => byId.get(relatedId)).filter((item) => item?.status === "published");
  $("#guide-content").innerHTML = `<div class="guide-header"><span class="category-tag">${escapeHtml(article.category)} · ${escapeHtml(article.task)}</span><h1 id="guide-title" tabindex="-1">${escapeHtml(article.title)}</h1><p>${escapeHtml(article.summary)}</p><span class="guide-time">About ${article.minutes} minutes</span></div>
    <div class="guide-body">${article.image ? `<img class="guide-image" src="${escapeHtml(article.image.src)}" alt="${escapeHtml(article.image.alt)}">` : ""}
      <div class="before-box"><strong>Before you start</strong><p>${escapeHtml(article.before)}</p></div>
      <h2>Step by step</h2><ol>${article.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      <p class="guide-disclaimer">General sample guidance. Always follow the instructions and safety warnings for your exact product model.</p>
    </div><div class="related"><h2>Keep going</h2><div>${related.map((item) => `<a href="#guide/${encodeURIComponent(item.id)}">${escapeHtml(item.title)} <span aria-hidden="true">→</span></a>`).join("")}</div></div>`;
  return true;
}

function renderQa() {
  const published = articles.filter((item) => item.status === "published");
  const draft = articles.filter((item) => item.status === "draft");
  const publishedIssues = issues.filter((issue) => byId.get(issue.articleId)?.status === "published");
  $("#nav-issue-count").textContent = issues.length;
  $("#qa-summary").innerHTML = `<div><strong>${published.length}</strong><span>Published guides</span></div><div><strong>${draft.length}</strong><span>Draft held for review</span></div><div><strong>${issues.length}</strong><span>Issues to resolve</span></div><div><strong>${publishedIssues.length}</strong><span>Published issues</span></div>`;
  const filter = $("#qa-filter").value;
  const shown = issues.filter((issue) => filter === "All" || issue.field === filter);
  $("#qa-issues").innerHTML = shown.length ? shown.map((issue) => {
    const article = byId.get(issue.articleId);
    return `<article class="issue"><span class="issue-field">${escapeHtml(issue.field)}</span><div><h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(issue.message)}</p><small>${article.status === "draft" ? "Draft · held from visitor view" : "Published"}</small></div><span class="issue-indicator" aria-label="Needs review">!</span></article>`;
  }).join("") : `<div class="qa-empty">No issues for this check.</div>`;
}

function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  const guideId = hash.startsWith("guide/") ? hash.slice(6) : null;
  let view = "browse";
  if (hash === "qa") view = "qa";
  else if (guideId && renderGuide(guideId)) view = "guide";
  for (const name of ["browse", "guide", "qa"]) $(`#${name}-view`).hidden = name !== view;
  $("#browse-nav").setAttribute("aria-current", view === "browse" || view === "guide" ? "page" : "false");
  $("#qa-nav").setAttribute("aria-current", view === "qa" ? "page" : "false");
  document.title = view === "guide" ? `${byId.get(guideId).title} | Retail Content Finder` : view === "qa" ? "Content QA | Retail Content Finder" : "Retail Content Finder | Independent sample";
  if (view === "qa") renderQa();
  if (view === "browse") renderCards();
  if (location.hash) { window.scrollTo({ top: 0 }); $(`#${view === "guide" ? "guide-title" : view === "qa" ? "qa-title" : "hero-title"}`).focus({ preventScroll: true }); }
  if (view === "browse" && focusSearchAfterRoute) { $("#search").focus(); focusSearchAfterRoute = false; }
}

populateFilters();
$("#nav-issue-count").textContent = issues.length;
$("#search").addEventListener("input", renderCards);
$("#category").addEventListener("change", renderCards);
$("#task").addEventListener("change", renderCards);
$("#qa-filter").addEventListener("change", renderQa);
function clearFilters() { $("#search").value = ""; $("#category").value = "All"; $("#task").value = "All"; renderCards(); $("#search").focus(); }
$("#clear-filters").addEventListener("click", clearFilters);
$("#empty-clear").addEventListener("click", clearFilters);
document.addEventListener("keydown", (event) => { if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) { event.preventDefault(); focusSearchAfterRoute = true; if (location.hash === "#browse") route(); else location.hash = "browse"; } });
window.addEventListener("hashchange", route);
route();
