---
title: Notes from my first real semester of AI
description: Multi-agent systems, MCP, and the unglamorous truth that most of the work is plumbing.
date: 2026-07-01
tags: [ai, learning, projects]
---

I spent this semester building things with LLMs instead of just talking to them.
A few lessons that cost me sleep, so they may as well cost you a scroll.

## 1. The model is the easy part

SynapX and Klinical taught me the same lesson from opposite directions: the
interesting problem is rarely the prompt. It's routing, memory, and knowing when
two answers disagree. The model is a component, not the architecture.

## 2. MCP made things click

Giving an LLM structured tools — instead of hoping it hallucinates the right
API call — changed how I design. In Klinical, the LLM parses intent and a
tool layer does the actual query against ClinicalTrials.gov. Clean seams.

## 3. Shared memory is a design problem, not a database problem

Deciding _what_ to remember is harder than storing it.

More experiments coming. If you're building in this space, I'd love to compare
notes.
