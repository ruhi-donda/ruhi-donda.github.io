---
title: OrbitVal
summary: Satellite simulation & report-verification tool — models orbits from live/manual TLEs or synthetic pre-launch data, runs fault scenarios, and attests results in a hash-chained registry.
stack: [Python, CLI, Orbital Mechanics, Cryptography]
repo: https://github.com/ruhi-donda/OrbitVal
order: 1
featured: true
---

A Python CLI for simulating and verifying satellite orbits. It ingests live or
manually entered TLEs, generates synthetic pre-launch orbits, and models fault
scenarios to stress-test mission assumptions. Every run is recorded in a
hash-chained attestation registry so reports can be independently verified and
can't be silently altered after the fact.
