# Storage

Date: 2024-10-23

## Context

In order to persist data locally, I planned to usea IndexedDB or Sqlite via Sqlocal.

## Decision

Even though Sqlocal is a great library, it adds 939kb wasm and ~200kb of minzipped js to the bundle. I decided to use IndexedDB instead. Initial storage implementation takes ~500b minzipped.
