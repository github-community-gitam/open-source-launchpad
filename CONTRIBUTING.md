# Contributing to Open Source Launchpad

Thanks for being here. This repository is part of **GITHUB Community GITAM**.

**If this is your first ever pull request:** add yourself to the
[contributor wall](wall.html). It is the gentlest possible start and it walks
you through every step.

---

## Never done this before?

You need exactly two things.

| Thing | How to check |
|---|---|
| **A GitHub account** | Sign in at [github.com](https://github.com). [Sign up](https://github.com/signup) — free, two minutes. |
| **Git on your laptop** | Run `git --version` in a terminal. If it prints a number, you have it. |

If `git --version` says "command not found", install it from
[git-scm.com/downloads](https://git-scm.com/downloads). On a Mac, running
`git --version` may offer to install it for you — say yes.

**First time using Git on this machine?** Run these two lines once, with your
own details:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Skip them and Git stops you at your first commit with `Please tell me who you are`.

### The whole thing, in eight steps

```
1. Pick an issue    ->  comment /claim
2. Fork             ->  your own copy on GitHub
3. Clone            ->  download it to your laptop
4. Branch           ->  git checkout -b fix/issue-12
5. Change one file  ->  in any editor
6. Commit           ->  save the change with a message
7. Push             ->  send it back to GitHub
8. Pull request     ->  ask us to merge it
```

Everything below is those eight steps, slowly. Most people finish their first
one in under twenty minutes.

**You cannot break anything.** You work on your own copy, on a branch, and a
human reads your change before it goes anywhere near the real project.

---

## What this project is

A small static website that teaches people to make their first open source
contribution. Plain HTML, CSS, and a little vanilla JavaScript.

**Tech stack:** HTML, CSS, vanilla JS. No framework, no build step, no
dependencies. Python 3 is used only by one helper script, and only in CI.

---

## Setting up locally

**You will need:** Git, a text editor, and Python 3 (which macOS and Linux
already have, and which you may already have on Windows).

### Fork it

**Fork** means "make my own copy of this project". Click **Fork** at the top
right of this page, then **Create fork**.

You now have your own copy at `github.com/YOUR-USERNAME/open-source-launchpad`. You can do
anything you like to it. **You cannot break the original.**

### Clone your fork

**Clone** means "download my copy so I can open the files".

First check you are on **your fork** — the URL must show *your* username, not
`github-community-gitam`. Then click the green **`< > Code`** button, copy the
HTTPS link, and:

```bash
git clone https://github.com/YOUR-USERNAME/open-source-launchpad.git
cd open-source-launchpad

# point at the original, so you can pull in other people's merged work later
git remote add upstream https://github.com/github-community-gitam/open-source-launchpad.git

# verify: origin must be YOUR username, upstream must be the org
git remote -v
```

> **The single most common mistake.** Cloning the original instead of your fork.
> Everything works until you push, which then fails with **permission denied**.
> `git remote -v` catches it in two seconds.

### Run it

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Edit a file, save, refresh the browser. That is the whole loop. Press `Ctrl+C`
in the terminal to stop the server.

> **Why not just double-click `index.html`?** Every page works that way except
> the contributor wall, which fetches a JSON file. Browsers block that from a
> `file://` page, so the wall would show an error message instead of cards.

If any of this does not work, that is a bug in *our* instructions — open an
issue and tell us where it broke.

---

## The contribution flow

### 1. Find an issue

Browse the [open issues](../../issues):

| Label | Means |
|---|---|
| `good first issue` | No knowledge of the codebase needed |
| `difficulty: beginner` | One file, a clear before and after |
| `difficulty: intermediate` | Some JavaScript, or several files |
| `difficulty: advanced` | Involves a design or CI decision |

### 2. Claim it — this step is not optional

Comment `/claim` on the issue. A bot assigns it to you within seconds.

> **PRs on unclaimed issues are closed.** Not to be harsh — without it, six
> people do the same task and five of them waste an evening.

You may hold **2 issues at a time**. Comment `/unclaim` to release one; that is
completely fine. Claims go stale after 5 days of no activity.

*Adding yourself to the contributor wall does not need an issue.* It is the
welcome task, not tracked work.

### 3. Branch

```bash
git checkout main
git pull upstream main
git checkout -b feat/short-description
```

| Prefix | For | Example |
|---|---|---|
| `feat/` | Something new | `feat/dark-mode-toggle` |
| `fix/` | Something broken | `fix/footer-link-404` |
| `docs/` | Documentation | `docs/setup-instructions` |
| `ci/` | Workflows | `ci/add-link-checker` |

### 4. Make the change

- Change **only** what the issue asks for
- **Colours go in `css/theme.css`** as variables, never hard-coded in a
  component. And set the dark-theme value too — it is directly below
- **Test at 375px wide.** Open your browser's device toolbar. Most of our
  visitors are on a phone
- **Test both themes.** Click the ☾ button in the header
- **Keyboard test:** press Tab through your change. You must be able to see
  where the focus is, and reach everything you can click

**Commit messages:**

```
fix: footer link pointed at a page that no longer exists

Closes #42
```

Format: `<type>: <what changed, lowercase, present tense>` where type is
`feat`, `fix`, `docs`, `ci`, `refactor`, or `chore`.

### 5. Check before you push

```bash
python3 scripts/build_contributors.py --check    # if you touched contributors/
```

And open the page. Actually look at it. In both themes.

### 6. Open the pull request

```bash
git push origin feat/short-description
```

GitHub then shows a yellow banner on your fork with a
**Compare & pull request** button. Click it, fill in the template, and click
**Create pull request**.

**Your description must contain `Closes #<issue-number>`.** That line links your
work to the issue and closes it automatically when you are merged. Without it
your PR gets sent back, because otherwise issues get forgotten and two people
end up doing the same work.

> If `git push` fails with **permission denied** or **repository not found**, you
> cloned the original instead of your fork. Run `git remote -v` and check whose
> username is there.

**Attach a screenshot.** For anything visual this is the single most useful
thing you can do — a reviewer cannot see your screen, and a before/after pair
gets you merged faster than any amount of explanation.

### What happens in the first minute

A box appears at the bottom of your pull request with checks running.

**A red X is not a rejection.** It is information. Click **Details** next to the
red one — the log prints the exact command to run on your own machine to see the
same problem.

To fix a red check: change the file, commit, and push to the **same branch**. The
pull request updates itself. You do not open a new one.

### What can actually fail your pull request

| Blocks the merge | Does **not** block |
|---|---|
| Broken HTML, a missing `alt`, a dead link | Untidy spacing or indentation |
| Invalid JSON in `contributors/` | Quote marks |
| A real bug in the JavaScript | A missing newline at the end of a file |

**Formatting never blocks you.** We removed that deliberately. Nobody's first
contribution should be rejected by a robot over four spaces of whitespace.

### 7. Review

A maintainer responds within **48 hours**:

- **Approved and merged** — done
- **Changes requested** — we point at exact lines. Push more commits to the
  same branch; the PR updates itself. This is normal and happens to experienced
  developers constantly. It is not criticism
- **Closed** — only if the PR breaks a rule below, and we will say which one

---

## Quality standards

### Automatically rejected

Marked `invalid` / `spam` and closed without review:

- Whitespace, comma, or formatting-only changes to Markdown files
- Adding your name or a link to `README.md` without being asked to
- AI-generated code pasted in without being read, that breaks the page or
  fails CI
- PRs that duplicate an already-open PR
- Reformatting or "tidying" code nobody asked to change
- A PR with no linked issue

### Always welcome

- Fixing a genuine bug, however small
- Accessibility fixes — contrast, focus, alt text, keyboard navigation
- Rewriting confusing wording so it is actually clear
- Telling us our setup instructions are wrong

### The 48-hour maintainer commitment

We acknowledge every PR within 48 hours. If yours has been sitting longer, ping
and say so in a comment on the pull request — you are not being annoying, we
dropped the ball.

---

## Using AI tools

You may use ChatGPT, GitHub Copilot, or anything else you like.

What you may not do is open a pull request you cannot explain. You are
responsible for understanding your change, running it yourself, and answering
questions about it in review. That is not a rule against AI — being able to
explain your own work is the entire reason you are here.

---

## House style

**HTML**
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Two-space indentation
- Every `<img>` needs `alt` — describe what it shows, or `alt=""` if it is
  purely decorative
- Headings nest properly. Do not jump from `<h2>` to `<h4>`

**CSS**
- Colours and spacing come from variables in `theme.css`. No hex codes in
  components
- Mobile-first: write the small-screen style, then add `@media (min-width: …)`
- Class names are lowercase with hyphens: `.contributor-card__name`

**JavaScript**
- Vanilla only. No libraries, no frameworks, no build step
- Wrap it in an IIFE and use `"use strict"`, as the existing files do
- Wrap every `localStorage` access in `try`/`catch` — it throws in private
  browsing
- The page must still work with JavaScript switched off, except the wall

---

## Getting unstuck

**Everyone gets stuck. It is not a sign that you do not belong here.**

1. Re-read the issue — the answer is often in "How to verify locally"
2. Look at how an existing page or component does the same thing
3. Comment on the issue and tag the mentor listed on it
4. Say what you have already tried — that alone often surfaces the answer
5. Come to a **PR Debug Clinic** (Oct 12, Oct 21) and we will sit with you

### When Git throws something at you

Nine times out of ten it is one of these:

| What you see | What it means |
|---|---|
| `permission denied` on push | You cloned the original, not your fork. Check `git remote -v` |
| `fatal: not a git repository` | You are in the wrong folder. `cd` into the project |
| `Please tell me who you are` | First time using Git. Run the two `git config` lines it prints |
| `Everything up-to-date` but nothing on GitHub | You never committed. Run `git status` |
| `error: failed to push some refs` | Someone changed `main`. `git pull upstream main`, then push again |
| Checks are red on your PR | Click **Details**. It names the file and the line |
| `merge conflict` | Two people edited the same lines. Ask — this one is worth a human |

### Command cheat sheet

```bash
# 1. clone YOUR fork
git clone https://github.com/YOUR-USERNAME/open-source-launchpad.git
cd open-source-launchpad

# 2. branch
git checkout -b fix/issue-12

# 3. ... make your change in an editor ...

# 4. see what you changed
git status
git diff

# 5. check it works
python3 -m http.server 8000

# 6. commit
git add .
git commit -m "fix: short description of what changed"

# 7. push
git push -u origin fix/issue-12

# then open the pull request, with "Closes #12" in the description
```

Useful when you need to undo something:

```bash
git log --oneline -5             # what did I commit?
git pull upstream main           # get the latest changes
git restore <file>               # throw away uncommitted changes to a file
git switch main                  # go back to the main branch
```

### Where to look things up

| I want to... | Go to |
|---|---|
| Understand a word like "upstream" | [Glossary](https://github-community-gitam.github.io/open-source-launchpad/glossary.html) |
| Check a question others have asked | [FAQ](https://github-community-gitam.github.io/open-source-launchpad/faq.html) |
| Walk through Git again, slowly | [Git basics](https://github-community-gitam.github.io/open-source-launchpad/git-basics.html) |
| Check my PR before I open it | [PR checklist](https://github-community-gitam.github.io/open-source-launchpad/pr-checklist.html) |

---

## Code of conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
In short: be kind, assume good faith, and remember that the person asking a
"basic" question is exactly who this project is for.

---

## Maintainers

| Name | GitHub | Looks after |
|---|---|---|
| Pushpam Raj Satyarthi | [@pushpam2404](https://github.com/pushpam2404) | Everything |

**Domain:** OS & DevX
