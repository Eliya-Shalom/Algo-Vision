### Update - Changelog :clipboard: 09.05.2022

> - AlgoVision is now fully mobile-responsive with all its features.
> - On mobile, the 'Mouse Chase' option in Dynamic Mode became 'Finger Chase'.
> - The left menu can be closed by clicking on the logo's icon, thus extending the visualization environment.
> - Performance improvement.
> - Code is more readable and cleaner.

# Quick Introduction

### Welcome to my Path-finding & Sorting algorithms Visualizer, **Algo-Vision**!

This application will bring you a better understanding of how pathfinding & sortition algorithms work by
demonstrating their actions with a nice and fine animation.

Here are some features that my application has to offer:

- Demonstrating famous algorithms, such as A-Star (two heuristics), Dijkstra, DFS and BFS in the pathfinding section,
  and Quick-sort, Merge-sort, Heap-sort, Radix-sort and more, in the sorting section.

- Dynamic pathfinding - a visualization mode that allows you to put midpoints across the board which the
  algorithm will reach, before it reaches the end point. Both midways and walls can be added during the animation (here comes the 'Dynamic').
  In this mode, the algorithm can chase your mouse movement, if enabled.
  \*\*for this purpose, I used the A\* algorithm with 'Diagonal' heuristic.

- Full control over the visualization progress such as Pause & Play, Running speed, Player-Bar (reverse/forward the animation and continue from there), and more.

- Displaying useful information about the algorithm's actions.

- Adjusting the animation environment and customizing the visualization playground to your flavor.

- Code implementation of each algorithm in Javascript.

- Designed and comfortable UI.

- Cool 3D effects, and more!

> **One note** about the algorithms' visualization:
>
> During the visualization, you might think that there are better algorithms than the others because they are animated faster in less Animation Time, but this is incorrect. The real indicator for efficiency is the Operations Counter indicator, which counts how many operations the algorithm was required to perform during its progress. The reason for the differences in the animation time is that there are algorithms that swap between items many times during their run. on dry (without animation), swap items in an array is a Constant Time operation ( O(1) ), but in animation terms, it isn't the case. The browser needs to repaint the swapped items. This action is an 'expensive' one, and therefore - longer animation time.
>
> For example, if we compare Merge-sort with Selection sort, in array of 100 items, the animation time (on max speed) is:
>
> [![compare-time.jpg](https://i.postimg.cc/8kRnBV9D/compare-time.jpg)](https://postimg.cc/DmzgnR7Y)
>
> But the Operations Counter proves the opposite:
>
> [![compare-ops.jpg](https://i.postimg.cc/2ykd7gL8/compare-ops.jpg)](https://postimg.cc/Q9zWX4qR)

This app was built with: React, Redux, and Material-UI.

I hope you will enjoy it! :blush: [Algo-Vision on Git-Pages](https://eliya-shalom.github.io/Algo-Vision/)

[Link to YouTube video presentation](https://www.youtube.com/watch?v=3FV6WjjJI78)

[![board.png](https://i.postimg.cc/MGnwnFr1/board.png)](https://postimg.cc/94HKSJ2f)
