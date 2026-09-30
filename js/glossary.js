/**
 * The glossary.
 *
 * Reads data/glossary.json and renders one entry per term, with a search box
 * that filters as you type.
 *
 * Kept deliberately plain: no framework, no build step. If you can read the
 * contributor wall script, you can read this one — they work the same way.
 */
(function () {
  "use strict";

  var DATA_URL = "data/glossary.json";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function entryFor(item) {
    var term = escapeHtml(item.term || "");
    var short = escapeHtml(item.short || "");
    var full = escapeHtml(item.full || "");

    var html = '<article class="glossary-entry">';
    html += '<h3 class="glossary-entry__term">' + term + "</h3>";
    html += '<p class="glossary-entry__short">' + short + "</p>";
    if (full) {
      html += '<p class="glossary-entry__full">' + full + "</p>";
    }
    html += "</article>";
    return html;
  }

  function render(items, listEl, countEl) {
    if (!items.length) {
      listEl.innerHTML =
        '<li class="wall-empty">No terms match that search.</li>';
    } else {
      listEl.innerHTML = items
        .map(function (item) {
          return "<li>" + entryFor(item) + "</li>";
        })
        .join("");
    }

    if (countEl) {
      countEl.textContent =
        items.length + (items.length === 1 ? " term" : " terms");
    }
  }

  function matches(item, query) {
    if (!query) return true;
    var haystack = [item.term, item.short, item.full]
      .join(" ")
      .toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var listEl = document.getElementById("glossary");
    if (!listEl) return;

    var countEl = document.getElementById("glossary-count");
    var searchEl = document.getElementById("glossary-search");
    var everything = [];

    fetch(DATA_URL)
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        everything = Array.isArray(data) ? data : [];
        everything.sort(function (a, b) {
          return String(a.term).localeCompare(String(b.term));
        });
        render(everything, listEl, countEl);
      })
      .catch(function () {
        listEl.innerHTML =
          '<li class="wall-empty">' +
          "Could not load the glossary.<br>" +
          "If you opened this file directly from your computer, your browser " +
          "blocks reading local files. Run <code>python3 -m http.server</code> " +
          "in the project folder and open <code>http://localhost:8000</code> " +
          "instead." +
          "</li>";
      });

    if (searchEl) {
      searchEl.addEventListener("input", function () {
        var query = searchEl.value.trim().toLowerCase();
        render(
          everything.filter(function (item) {
            return matches(item, query);
          }),
          listEl,
          countEl
        );
      });
    }
  });
})();
