---
layout: article
title: Algorithm Basics
key: acm
modify_date: 2018-07-11
tags:
  - Algorithm
comment: true
mathjax: true
---

ACM, the world's largest educational and scientific computing society, delivers resources that advance computing as a science and a profession. ACM provides the computing field's premier Digital Library and serves its members and the computing profession with leading-edge publications, conferences, and career resources.
<!--more-->

# Loops and Recursive

## Define Struct
There are many ways to define *struct*, what we should do is that chose a best way to solve problem.

**Example 1**
{% highlight c %}
struct Point { double x, y; };
double dist(struct Point a, struct Point b){
    return hypot(a.x-b.x, a.y-b.y);
}
{% endhighlight %}

**Example2**

{% highlight c %}
typedef struct { double x, y; } Point;
double dist(Point a, Point b){
    return hypot(a.x-b.x, a.y-b.y);
}
{% endhighlight %}

As you can see from the comparison, **Example 2** is better, which use `typedef struct { define; }struct name; ` to define.

# Asymptotic Growth

## O-notation

- O-notation(Bog-O), When we say “the running time is $O(n^2)$” we mean that the worst-case running time is $ O(n^2)$ – the best case might be better. (渐进上界)
- When we say “the running time is Ω(n2)” we mean that the best-case running time is $$Ω(n^2)$$ – the worst case might be worse.(渐进下界)
  

# Recurrences

- Substitution method
- Recursion-tree method
- Master method

Simplified Master Theorem:

Let $a \geq 1$ and $b > 1$ be constants and let $T(n)$ be the recurrence $T(n) = aT(\frac{n}{b}) + cn^k$, defined for $n \geq 0$.

1. If $a > b^k$, then $T(n) = \Theta(n^ {log_{a}b})$.
2. If $a = b^k$, then $T(n) = \Theta(n^ k{logn})$.
3. If $a < b^k$ then $T(n) = \Theta(n^k)$.

# Divide-and-Conquer

**Merge Sort**: $T(n) = O(nlog_{2}n)$

another example:

- Counting Inversions
- Matrix Multiplication: 
  - Brute Force(暴力):  $O(n^3)$ arithmetic operations
  - 

# Heap

## MAX-Heap

Action of build max-heap:

1. 找到最后一个节点的父亲节点
2. 

## Heapsort

Priority Queues

# Elements of DP Algorithms

- Optimal substructure
- Overlapping subproblems