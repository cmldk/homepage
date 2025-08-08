---
title: 'Humanize Duration'
description: 'Fork of the HumanizeDuration.js package with an additional time adverb feature.'
date: 'Feb 12 2023'
repoURL: 'https://github.com/cmldk/HumanizeDuration.js'
---

An extra time adverb has been added to the original package. It accepts negative durations. "-361000" becomes "6 minutes, 1 second ago".

**timeAdverb**

Time adverb added to the result according to duration. This accepts negative durations while using it.

```js
humanizeDuration(363000); // '6 minutes, 3 seconds'
humanizeDuration(363000, { timeAdverb: true }); // 'in 6 minutes, 3 seconds'
humanizeDuration(-363000, { timeAdverb: true }); // '6 minutes, 3 seconds ago'
humanizeDuration(-363000, { language: 'tr', timeAdverb: true }); // '6 dakika, 3 saniye önce'
```
