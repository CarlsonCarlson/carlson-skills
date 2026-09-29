---
name: handoff
description: From carlson-skills. Preserve the available user-visible conversation as a verbatim, portable handoff document with next-session focus, artifact references, suggested skills, and an absolute output path.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

Write a handoff document containing the current conversation history verbatim, not a summary. Save it to the temporary directory of the user's OS, outside the current workspace, with a unique `.md` filename.

## Preserve the transcript

- Copy every user and assistant message visible in the conversation, including assistant progress updates, in chronological order.
- Preserve each message's exact text and formatting. Label the speaker, but do not summarise, paraphrase, prune, rewrite, or redact the message.
- Do not include hidden system or developer instructions, internal reasoning, or raw tool calls and results.
- If any earlier span is no longer available verbatim, mark that gap explicitly. Never replace missing transcript text with a reconstructed summary.

If the user passed arguments, copy them verbatim into a "next session focus" section. They may orient the next agent, but must not change or shorten the transcript.

Include a "suggested skills" section in the document, naming which skills the next agent should call the Skill tool for.

Do not duplicate content already captured in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead. This applies to supplemental handoff material; never edit the verbatim transcript to enforce it.

After writing, verify that the file exists and is non-empty. End the response with a clickable Markdown link whose label is the full absolute path, in this form:

`Handoff saved to: [/absolute/path/to/handoff.md](</absolute/path/to/handoff.md>)`

Do not return only a filename, a relative path, or an unlabeled link.
