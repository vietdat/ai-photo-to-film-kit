# Distribution — launch checklist for ai-photo-to-film-kit

How to get this repo found. Nothing in this file has been posted anywhere
— it is a plan and a set of drafts for the owner to use. **Do not post
anything from here without reading the linked community's current rules
first.** Rules change; the notes below are from 22 November 2026.

## GitHub settings (set these before launch day)

### Repository description (copy-paste into GitHub → About)

> Turn still photos into a cinematic AI video: 38 copy-paste prompts for Kling, Runway, Wan and Veo, complete wedding, anniversary and proposal storyboards, a Claude skill, and an ffmpeg assembly script.

The README's opening line is the same sentence, so the repo reads
consistently everywhere GitHub shows it.

### Topics (GitHub → About → Topics, up to 20)

```
ai-video, kling, runway, prompt-engineering, wedding-film, storyboard,
wan, veo, ffmpeg, image-to-video, cinematic, claude-code, video-prompts,
ai-filmmaking, wedding-video, proposal, anniversary, ken-burns,
video-generation, open-source
```

These match what developers and creators actually search for: the model
names (kling, runway, wan, veo), the task (ai-video, image-to-video,
video-generation, cinematic), the craft (prompt-engineering,
video-prompts, storyboard, wedding-film, wedding-video, ken-burns), the
tooling (ffmpeg, claude-code), and the occasion verticals (proposal,
anniversary).

## Before launch day (Day 0)

- [ ] Repo is public at `https://github.com/vietdat/ai-photo-to-film-kit`
- [ ] Description and all 20 topics set (above)
- [ ] CI is green on `main` (`npm test` + `bash -n scripts/*.sh`)
- [ ] Record a short demo: screen-record the prompt browser
      (`web/index.html`) and play 15 seconds of the finished film
      (`examples/finished-film/wedding-60s-reception-film.mp4`).
      Label the film motion-from-stills wherever it appears — it is not
      AI motion.
- [ ] Write the dev.to draft (Day 3) in advance so launch week is not
      spent writing.
- [ ] Read the current rules of every community below before posting.
      Do not ask anyone to upvote or comment — that gets posts removed
      and can get the account flagged.

## Where to post (all verified 22 November 2026)

| Channel | Why it fits | Rule that matters |
| ------- | ----------- | ----------------- |
| Hacker News — Show HN | Developers who try things | Title must start "Show HN". Must be something people can try now. **HN forbids generated text in posts — write the post and first comment in your own words; the notes in Day 1 are talking points, not text to paste.** Do not ask for upvotes. |
| r/coolgithubprojects | Built for sharing GitHub repos | Title format `[Description] - [Project name]`. Repost only after 6+ months and only with new features. |
| r/SideProject | Self-promotion is encouraged | Lead with the problem and what you built. |
| dev.to | Developers who read tutorials | Post as a tutorial article, not an ad. Teach the workflow, link the repo at the end. |
| r/ClaudeCode | The repo ships a Claude skill | Simple project sharing goes in the weekly showcase thread. A standalone post needs a substantial write-up and the "Built with Claude Code" flair. |
| X | Short-form reach for creators | Thread format; one idea per post; link the repo in the last post, not the first. |
| r/weddingvideography | The wedding niche, directly | Small community. Value first: show the film, ask videographers what would make it useful to them. Do not spam the link. |
| r/webdev | Web developers, 3M+ members | Self-promotion only in showoff threads. Check the current rules before posting. |

### Do NOT pitch here

- **r/VideoEditing** (~500K members): no promotional links, low tolerance for self-promotion. Do not post the repo link there. Check the current rules before posting anything, including tutorials. Participate as a member instead: answer questions about AI video prompting and mention the repo only if someone asks for a resource.

## Day-by-day launch order

### Day 1 — Show HN + r/coolgithubprojects

Post in the morning US time, when both are most active. Be free for
several hours afterwards to answer comments — showing up matters more
than the post itself.

**Show HN — talking points (write it yourself, in your own words; HN
forbids generated text, including AI-edited text):**

- Title: `Show HN: Turn wedding photos into an AI film with copy-paste prompts`
- First comment should cover, in your own words: what it is (prompt
  templates, storyboards, a Claude skill, an ffmpeg script); who it is
  for (wedding videographers, couples making their own reception film);
  how to try it (open `web/index.html`, no install; or run the ffmpeg
  script on the sample album); and one honest limitation (the bundled
  example film is motion-from-stills, not AI motion — real AI clips need
  Kling/Runway/Wan/Veo).

**r/coolgithubprojects — draft:**

- Title: `[Open source] Turn still photos into a cinematic AI film — prompts, storyboards and a Claude skill`
- Body:
  > I make wedding films from still photos with AI video tools (Kling, Runway, Wan, Veo), and I kept rewriting the same prompts — so I open-sourced the kit.
  >
  > 38 copy-paste prompts (wedding, anniversary, proposal), each with model, version, duration, aspect ratio and camera motion. Three complete storyboards with exact timings (60s wedding, 30s anniversary, 45s proposal). A Claude skill that picks the model and adapts a prompt to your photo. And an ffmpeg script that builds a motion-from-stills preview film from a storyboard so you can check timing before spending on generation.
  >
  > The example film in the repo is honestly labelled motion-from-stills, not AI motion. MIT licensed. Feedback welcome — especially from wedding videographers: what would make this useful in real work?
  >
  > https://github.com/vietdat/ai-photo-to-film-kit

### Day 2 — r/SideProject

**Draft:**

- Title: `I built an open-source kit for turning wedding photos into AI films`
- Body:
  > Problem: AI video tools can animate a photo, but a photo plus a one-line prompt usually comes back with warped faces and flickering light. I kept rewriting the same prompts — which model for which shot, how much motion to ask for, how to keep hands from warping.
  >
  > So I packaged it: 38 prompts for Kling, Runway, Wan and Veo, three storyboards with exact timings, a six-step tutorial, a Claude skill, and an ffmpeg script that assembles a preview film from stills.
  >
  > Free and MIT licensed. If you shoot weddings or make films from photos, I'd love to know what I'm missing.
  >
  > https://github.com/vietdat/ai-photo-to-film-kit

### Day 3 — dev.to article

Publish a tutorial article, not an announcement. Suggested title:
`How I turn still wedding photos into a cinematic AI film (with prompts that actually work)`.

Structure: the problem (warped faces, flicker) → the photo checklist
→ the model selector (which model for which shot) → one full prompt,
explained line by line → the 60-second storyboard → the ffmpeg preview
→ what still goes wrong and how to fix it. Link the repo once, at the
end, as the place where the prompts live. Include one prompt verbatim
so the article is useful even without clicking through.

### Day 4 — r/ClaudeCode weekly showcase thread

Post in the weekly showcase thread (not a standalone post, unless you
write a full technical write-up with the "Built with Claude Code"
flair). Angle: the skill.

**Draft comment:**

> Built a Claude skill for turning photos into AI films: it picks the model (Kling/Runway/Wan/Veo) from the photo and the occasion, adapts a prompt from a 38-prompt kit, and slots the clip into a storyboard with exact timings. The kit also has a single-file prompt browser and an ffmpeg assembly script. MIT licensed — the skill is at `skills/photo-to-film/SKILL.md`.
>
> https://github.com/vietdat/ai-photo-to-film-kit

### Day 5 — X thread

Five posts, one idea each. Link the repo in the last post only.

1. `Wedding photos + a one-line AI prompt usually gives you warped faces and flickering light. I spent months learning what actually works — and open-sourced the kit.`
2. `The core idea: one motion per clip. A veil moving OR a slow orbit — never both. Models have to choose, and they choose wrong.`
3. `Each prompt states the model, version, duration, aspect ratio and camera motion. Kling 10s for faces, Wan 5s for tiny motion, Veo 8s for wide night shots.`
4. `Three storyboards with exact timings: 60s wedding reception film, 30s anniversary, 45s proposal. Timings sum exactly — the tests check.`
5. `38 prompts, a Claude skill, a prompt browser, an ffmpeg preview script. MIT licensed: https://github.com/vietdat/ai-photo-to-film-kit — would love feedback from wedding videographers.`

### Day 6 — r/weddingvideography + r/webdev

**r/weddingvideography — draft (value first, ask for feedback):**

- Title: `I made a free prompt + storyboard kit for AI wedding films from still photos — what would make it useful to you?`
- Body: short version of the Day 2 post, plus the honest label (the
  bundled example is motion-from-stills, not AI motion) and a direct
  question: which shot in a reception film would you most want an AI
  prompt for? Link the repo once.

**r/webdev — only in a showoff thread, and only after checking the
current rules.** Angle: the single-file prompt browser
(`web/index.html`, no build step, data embedded from the prompt files)
and the zero-dependency Node test setup.

### Day 7 — Follow up, do not repost

- Reply to every comment from the week, even short ones. Answer
  questions; do not argue.
- Fix the issues people raised (a broken link, a wrong model version,
  a confusing prompt) and say so in the thread.
- Do not post the repo to any community a second time this week, and
  do not repost to r/coolgithubprojects for at least 6 months.
- Note which channel brought real feedback, and use that for the next
  release's changelog.

## Rules for every post

- No invented numbers: no star counts, no download counts, no
  testimonials. The drafts above contain none.
- No fake video: the example film is motion-from-stills. Say so wherever
  it appears.
- One launch post per community. If a post is removed, read the removal
  reason, wait, and fix the approach — do not repost the same text.
- Never ask friends to upvote or comment. Never buy engagement.

## How the communities were verified (22 November 2026)

- r/ClaudeCode, r/coolgithubprojects, r/SideProject, r/webdev,
  r/VideoEditing, r/weddingvideography: confirmed via web search
  against subreddit stats and rules pages (member counts and
  self-promotion rules as quoted in the table above).
- Hacker News Show HN: confirmed against the Show HN guidelines and
  moderator tips, including the rule against generated text in posts.
- dev.to and X: established publishing platforms; no verification
  needed beyond that.
