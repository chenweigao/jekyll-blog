---
layout: article
title: Basic Algorithm`s Implementation
key: basicalgorithm
modify_date: 2017-07-12
tags:
  - Algorithm
comment: true
mathjax: true
---

<!--more-->

# 1. Sort

## 1.1 Quick Sort

{% highlight python linenos %}

def partition(arr, first, last):
    pivot = first
    for pos in range(first, last):
        if arr[pos] < arr[last]:
            arr[pos], arr[pivot] = arr[pivot], arr[pos]
            pivot += 1
    arr[pivot], arr[last] = arr[last], arr[pivot]
    return pivot

def qucik_sort(arr, first, last):
    if first < last:
        pi = partition(arr, first, last)
        qucik_sort(arr, first, pi-1)
        qucik_sort(arr, pi+1, last)

A = [534, 246, 933, 127, 277, 321, 454, 565, 220]
qucik_sort(A, 0, len(A) - 1)
print(A)

{% endhighlight %}

- Worst-case running time $\Theta(n^2)$:
  - input sorted or reverse sorted, partition around min or max element.
  - one side of partition has no elements.
  - $T(n) = T(0) + T(n – 1) + cn$
- Expected running time $O(nlgn)$
  - If we are really lucky, partition splits the array evenly n/2 : n/2: $T(n) = 2T(n/2) + Θ(n) = Θ(n lg n)$

Divide and conquer: partition, pivot

## 1.2 Selection Sort

{% highlight python linenos %}

def selection_sort(arr):
    for i in range(len(arr)):
        minimum = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[minimum]:
                minimum = j
        arr[minimum], arr[i] = arr[i], arr[minimum]
    return arr

A = [534, 246, 933, 127, 277, 321, 454, 565, 220]
selection_sort(A)
print(A)

{% endhighlight %}

## 1.3 Counting-sort



# 2. Swap


## 2.1 Implementation

1. 基本实现：

   {% highlight c++ linenos %}

   //引用实现
   swap(int &x, int &y){
       int temp;
       temp = x;
       x= y;
       y =x;
   }
   swap(x, y);

   

   //指针实现
   swap(int *x, int *y){
       int temp;
       temp = *x;
       *x = *y;
       *y = temp;
   }
   swap(&x, &y);
   {% endhighlight %}

   

2. 异或实现：

   {% highlight c++ linenos %}

   void swap(int &x, int &y){
       x ^= y;
       y ^= x;
       x ^= y;
   }
   swap(x, y);

   void swap(int *x, int *y){
       *x ^= *y;
       *y ^= *x;
       *x ^= *y;
   }
   swap(&x, &y);
   {% endhighlight %}

   

3. 加减操作：

   {% highlight c++ linenos %}

   void swap(int &x, int &y){
       x = x + y;
       y = x - y;
       x = x - y;
   }
   swap(x, y);

   void swap(int *x, int *y){
       *x = *x + *y;
       *y = *x - *y;
       *x = *x - *y;
   }
   swap(&x, &y);
   {% endhighlight %}

   

4. 宏定义：

   ```c++
   #define swap(x, y) { x ^= y; y ^= x; x ^= y; }
   #define swap(x, y) { x = x + y; y = x - y; x = x - y; }
   swap(x, y);
   ```

## 2.2 Add Two Numbers

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order** and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example**

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```

**code**

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *dummyHead = new ListNode(0);
        ListNode *p = l1, *q = l2, *curr = dummyHead;
        int carry = 0;
        while(p != nullptr || q != nullptr) {
            int x = (p != nullptr)? p->val : 0;
            int y = (q != nullptr)? q->val : 0;
            int sum = carry + x + y;
            carry = sum / 10;
            curr -> next = new ListNode(sum % 10);
            curr = curr->next;
            if(p != nullptr)
                p = p->next;
            if(q != nullptr)
                q = q->next;
        }
        if(carry > 0) {
            curr->next = new ListNode(carry);
        }
        return dummyHead->next;
    }
};
```

