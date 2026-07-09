---
title: Why I built OrbitVal
description: A satellite simulator that also refuses to let you fudge the numbers — notes on trust, TLEs, and hash-chained attestation.
date: 2026-06-20
tags: [space, projects, python]
---

Most orbit tools answer one question: _where will this satellite be?_ OrbitVal
answers a second one I couldn't stop thinking about: _can you prove the report
you're showing me wasn't quietly edited afterward?_

## The itch

I kept running into simulation outputs that were impossible to verify. Numbers
in a slide deck are just numbers. If the underlying run changed, nobody would
know.

## The idea

OrbitVal does the normal things — ingests live or manual TLEs, generates
synthetic pre-launch orbits, and models fault scenarios. But every run is
committed to a **hash-chained attestation registry**. Change one input, and the
chain visibly breaks.

```text
run_003  ← hash(run_002 + inputs + outputs)
run_002  ← hash(run_001 + inputs + outputs)
run_001  ← genesis
```

It's a small idea with an outsized payoff: reports become tamper-evident by
construction.

## What's next

Better fault libraries, and maybe a web viewer. For now it's a CLI, and I kind
of love that.
