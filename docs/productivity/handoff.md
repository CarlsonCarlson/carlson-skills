## What it does

`handoff` copies the conversation you are in into a **handoff document**: one Markdown file, written to your OS's temporary directory rather than into the workspace, that a fresh [agent](https://www.aihero.dev/ai-coding-dictionary/agent) can read to pick the work up.

The defining constraint is **verbatim**: it preserves every user-visible user and assistant message in order instead of compacting them into a summary. What it buys is portability without lossy compression. You need that file when the work has to travel: to a new [harness](https://www.aihero.dev/ai-coding-dictionary/harness), a new directory, a colleague, or a side task you want to fork off.

## When to reach for it

You invoke this by typing `/handoff`; the agent won't reach for it on its own. Pass a note about what the next session is for, and that note is recorded separately without changing the transcript.

Four situations are the whole trigger:

| Situation | Why a file |
| --- | --- |
| Swapping harness (Claude → Codex) | The new harness cannot see the old [context](https://www.aihero.dev/ai-coding-dictionary/context) |
| Moving to a different directory or repo | A prototype directory is the common case |
| Sending the work to a colleague | They need something they can read |
| Forking a side task found mid-phase | You keep working; a second agent takes the fork |

For anything else (same harness, same directory, and nothing needs to travel), staying in the [session](https://www.aihero.dev/ai-coding-dictionary/session), `/clear`, a [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent), or `/compact` is usually the move. [ask-matt](https://aihero.dev/skills-ask-matt) carries the ordered tree over all five options at a phase boundary.

## Verbatim is the point

A summary can look complete while silently dropping rejected alternatives, exceptions, numerical defaults, and agreed ordering. A transcript does not decide what is important. It copies the visible conversation exactly as it happened, including assistant progress updates, and labels each speaker.

The copy covers user-visible user and assistant messages. Hidden system or developer instructions, internal reasoning, and raw tool calls are not part of the transcript. If an older span is already unavailable verbatim, the document marks the gap rather than inventing or substituting a summary.

## What travels, and what doesn't

The document carries the verbatim transcript, an optional next-session focus, and a **suggested skills** section naming what the next agent should reach for. The transcript is not shortened or redacted.

Specs, plans, ADRs, issues, commits, and diffs that already exist elsewhere are referenced by path or URL rather than copied again as supplemental material. That rule never edits the transcript itself: text that appeared in a message stays in the message.

The final response shows the full absolute path as the label of a clickable local link. The filename alone is not enough; the path is the thing you paste into the fresh session.

## Common questions

**Handoff or compact?**

Use `/handoff` when the conversation has to travel and you want its wording preserved. `/compact` compresses the context into a summary and continues in the same harness; it is smaller, but it can flatten a load-bearing detail. `/handoff` is deliberately longer because it keeps the visible dialogue verbatim.

**So what's the actual difference between compact, clear and handoff?**

`/compact` creates a [secondary source](https://www.aihero.dev/ai-coding-dictionary/secondary-source): a summary of what happened. `/clear` starts with nothing. `/handoff` makes a portable copy of the visible [primary source](https://www.aihero.dev/ai-coding-dictionary/primary-source). Continuing still preserves more than any file because the live session also retains tool and harness state.

**Where did my handoff file go?**

The skill ends by showing the full absolute path as a clickable link. The file lives in the OS temp directory, which keeps it out of the workspace but is not durable storage. Some environments clear temp between sessions, and `/private/tmp` can disappear on reboot; move the file somewhere durable if the next session will not start soon.

**How do I actually hand it to the next agent?**

Open the fresh session and point it at the path: read this handoff file, then continue. Use the path shown by the skill rather than retyping or guessing the temp location.

**Does the artifact rule make the transcript incomplete?**

No. Existing artifacts are not copied a second time into supplemental notes, but every visible message remains verbatim. If a message pasted part of a spec or diff, that text remains because it is part of the conversation history.

**What if the conversation was already compacted?**

The skill cannot recover text the harness no longer provides. It marks that span as unavailable and copies everything it can still see verbatim. It never presents a reconstructed summary as the missing transcript.

**Does it remove credentials or personal information?**

No. Verbatim means no redaction. Treat the handoff file as at least as sensitive as the conversation it copies and share it accordingly.

**Is this the same as `/branch`, `--fork-session`, or a built-in fork?**

No. A native fork can inherit the harness's full context and tool state, but usually cannot cross into another harness, directory, or person's machine. This skill copies only the user-visible conversation into a file, which is less state than a native fork but more portable.

## It's working if

- Every available visible user and assistant message appears once, in the original order and wording.
- No summary, paraphrase, pruning, or redaction replaces transcript text.
- Existing specs, issues, commits, and diffs appear as paths or URLs rather than duplicated supplemental content.
- The suggested-skills section names what the next agent should reach for.
- The final response displays a clickable absolute path, not only a filename or relative path.
- A fresh agent can start from the file without asking you to paste the conversation again.

## Where it fits

`handoff` is a **reach-for-it-anytime standalone** at the seam between sessions rather than a step inside a build chain. Its closest neighbour is [prototype](https://aihero.dev/skills-prototype), because a prototype lives in its own directory and the round trip out and back is exactly the crossing this skill is for. When you're unsure whether to continue, clear, hand off, delegate, or compact, [ask-matt](https://aihero.dev/skills-ask-matt) carries the tree that orders those five and routes you over the rest of the set.
