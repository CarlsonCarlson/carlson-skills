---
name: research
description: From carlson-skills. Investigate a question against primary sources, reach the current state of the art, and write up dated, cited, checkable findings as a Markdown file. Use when the user wants a topic researched, the frontier of a field mapped, docs or API facts gathered, or reading legwork delegated to a background agent.
---

Spin up a **background agent** to do the research, so you keep working while it reads. Run it on **Opus**. Give it the question, today's date, and this whole file as its brief.

Its job:

1. Investigate the question against **primary sources** (papers, official docs, source code, specs, first-party APIs), not a secondary write-up of them. Open every source you cite and follow every claim back to the source that owns it.
2. Reach the **state of the art**: do a recency pass limited to the last 12 months, and flag any topic where the newest source is older than that.
3. Report **facts, not opinions**. Label every inference as inference. Never present a guess as settled.
4. Write the findings to a single Markdown file in the shape below, citing each claim's source.
5. Save it where the repo already keeps such notes; match the existing convention, and if there is none, put it somewhere sensible and say where.

## Primary sources only

A primary source is the thing itself: the paper, the official docs page, the source code, the spec, the changelog, the benchmark's own leaderboard, the author's own post. A blog post about a paper, a news article, a survey, a Wikipedia page, or a search snippet is a lead, not a source. Follow the lead to the primary source and cite that.

- **Open every source you cite.** Read the part you are citing. Do not cite from a search result snippet, an abstract, a summary, a repost, or memory.
- **If you cannot open it, do not cite it as fact.** Put it under "Not found or not verified" instead, with the reason (paywall, 404, no primary source exists, only secondary coverage found).
- **Every claim gets a citation**, inline, right after the claim: a link plus the date of the source. One claim, one source. If a claim rests on two sources, cite both.
- **Quote the exact words** where wording matters (a definition, a number, a limitation the authors state). Short quotes, in quotation marks, with the link.
- **Numbers carry their conditions**: which benchmark, which version, which model, which date, which setting. "87%" on its own is not a fact.

## Reach the state of the art

Your training data is stale. Assume every field has moved since then and go check.

- **Recency pass.** After the first pass, run a second search limited to the last 12 months from today's date: date-restricted web search, arXiv listings sorted by date, GitHub releases and changelogs, official blogs and docs "what's new" pages. Search for terms the field uses now, not only the terms you already know.
- **Record the newest source per topic.** For each section, note the date of the newest primary source you found.
- **Flag stale topics.** If the newest source on a section is more than 12 months old, write this line at the top of the section: `Newest source found: <date>. Either this topic is quiet or the search missed something.` Do not hide the gap.
- **Chase successors of anything older than 12 months.** A paper from 2024 is a starting point, not an answer. For every cited work older than 12 months, search for what cites it, what extends it, and what replaced it (Semantic Scholar or Google Scholar "cited by", arXiv search on its key terms, the authors' later papers, the project's repo). Then write one line under the claim: `Latest work on this: <newest successor, date, link>` or `Latest work on this: none found after <date>; searched <where>.` Never explain a term with only the paper that coined it.
- **Read the current version.** Prefer the latest paper revision, the current docs page, and the default branch. Note the version or date you read, because sources change.
- **Check that a result still stands.** Look for errata, retractions, follow-up papers that fail to reproduce it, and "deprecated" notices in docs. Report what you found either way.

## Facts, not opinions

- **Say what the source says.** Describe findings in the source's own terms. Do not round up, soften, or extrapolate.
- **Label inference.** When you combine sources or reason past what any source states, start the sentence with `Inference:` and name what it is inferred from.
- **Mark every claim's status** with one of three words:
  - `confirmed`: you opened a primary source that says it.
  - `reported`: a secondary source says it and you could not open the primary source.
  - `inference`: your own reasoning.
- **Show disagreement, do not resolve it.** Where sources conflict, present each side with its citation. Do not pick a winner unless a primary source settles it.
- **No recommendations unless asked.** If the user asked for a judgement, put it in one section at the end titled "Assessment (inference)" so it cannot be mistaken for a finding.
- **"Unknown" is a valid finding.** Say it plainly when nobody has measured something.

## Not falsely conclusive

The doc must end with the open questions the field itself calls unresolved. Each one is tied to a source that says it is open: a limitations or future-work section, an open issue, a workshop call for papers, a disagreement between two papers, a benchmark nobody has topped. Not your own musings about what would be interesting. If you cannot find a source that calls a question open, it does not go in this section.

## Easy to break

A reader should be able to attack the doc in five minutes. Give them what they need:

- **Sources list with dates, up front**, before the findings. One line per source: title, author or org, publication date, date you opened it, type (paper, docs, code, post).
- **"What would a critic say" section.** For each main claim: the strongest objection, the weakest source behind it, whether it rests on one source, what a sceptic would check first, and what evidence would overturn it.
- **"Not found or not verified" section.** Everything you looked for and could not find, could not open, or could not confirm against a primary source. Say what you searched and where.

## Doc shape

```markdown
# <Question, as asked>

Research date: <today>. Newest source found: <date>. Primary sources only, each opened before use. Anything not opened is marked `reported` or sits under "Not found or not verified".

## Sources
- <Title>. <Author or org>. Published <date>. Opened <date>. <paper | docs | code | post>. <link>

## TL;DR
Three to six lines. Facts only, each with a citation and a status word.

## Findings
One section per sub-topic. Each section starts with `Newest source found: <date>` and the stale flag if it applies.
Each claim: statement, status word, citation.

## What would a critic say
## Not found or not verified
## Open questions the field calls unresolved
Each with the source that says it is open.

## Assessment (inference)
Only if the user asked for a judgement.
```

## Before writing

Check the doc against this list and fix what fails:

- Every claim has an inline citation to a source you opened, or is labelled `reported` or `inference`.
- Every section has a "newest source" date, and stale sections carry the flag line.
- Every cited work older than 12 months has a "Latest work on this" line under it.
- The sources list sits above the findings and every source has both dates.
- The critic section, the not-found section, and the open-questions section all exist and are not empty.
- Every open question points at a source that calls it open.
- No sentence states an opinion as a finding.
