# Queued Rust Crate Documentation
---
## Introduction
Welcome to the documentation for Queued Rust, a crate designed to provide queue data structures for your Rust projects. This crate offers efficient implementations of both standard queues and sorted queues.

## Features
All queues implement a max_size feature to better constraint them.
Queues have a reverse field, so you can switch the ordering of a queue.
So you can turn a FIFO queue to a FOFI queue.
And turn a priority queue to a lowest priority queue.

 - Queue: A basic FIFO (First-In, First-Out) queue.
 - SortedQueue: A queue that maintains elements in sorted order.
 - Weighted: Wrapper type to add ordering to any object.

 Additionally there are helper functions to help do common tasks like combining queues and turning them into different forms.

## Types

### Queue
A basic FIFO (First-In, First-Out) queue.

Example
```rust
use queued_rust::{Queue};

fn main() {
    // Creating a regular queue
    println!("Testing Out Queues\n");
    let mut queue = Queue::new(false);

    // Add items to the regular queue
    queue.add(4);
    queue.add(1);
    queue.add(3);
    queue.add(5);
    queue.add(2);

    // Two methods for iterating (.next and .iter)
    println!("Printing items from regular queue");
    // Notice how the items are printed in order of add 4, 1, 3, 5, 2
    while let Some(item) = queue.next() {
        println!("Remaining: {} Item: {}", queue.len(), item);
    }

}
```

### SortedQueue
A queue that maintains elements in sorted order.
Elements must implement ordering traits.

Example
```rust
use queued_rust::{SortedQueue};

fn main() {
    // Creating a sorted queue
    println!("\n\nTesting Out Sorted Queues\n");
    let mut sorted_queue = SortedQueue::new(true);

    // Add items to the sorted queue
    sorted_queue.add(4);
    sorted_queue.add(1);
    sorted_queue.add(3);
    sorted_queue.add(5);
    sorted_queue.add(2);

    // Notice how the items are printed in order 1, 2, 3, 4, 5
    println!("Printing items from sorted queue");
    while let Some(item) = sorted_queue.next() {
        println!("Remaining: {} Item: {}", sorted_queue.len(), item);
    }
}
```

### Weighted
A simple wrapper type that allows you to stick a weight number next to any item to easily use the sorted type as it needs the type to implement ordering traits

Example 
```rust
use queued_rust::{SortedQueue, Weighted};

fn main() {
    // Creating a sorted queue with weights
    println!("\n\nTesting Out Sorted Weighted Queues\n");
    let mut sorted_weighted_queue = SortedQueue::new(false);

    // Add items to the sorted queue
    sorted_weighted_queue.add(Weighted::new("hello", 10));
    sorted_weighted_queue.add(Weighted::new("this queue", 4523));
    sorted_weighted_queue.add(Weighted::new("is harder to order", 12412));
    sorted_weighted_queue.add(Weighted::new("properly", 14));
    sorted_weighted_queue.add(Weighted::new("so it might be better", 214));
    sorted_weighted_queue.add(Weighted::new("to add a weight system", 41444));


    println!("Printing items from sorted queue");
    while let Some(item) = sorted_weighted_queue.next() {
        println!("Remaining: {} Item: {}", sorted_weighted_queue.len(), item.into_item());
    }
}
```

### Sized Queue
This is a constraint you can add onto any queue that forces it to be a specific size. 
Constructing a sized queue just means using the new_sized method to create a sized queue object.
Now because just adding an item to the queue can throw an error its best practice when using a 
sized queue to use the try_add method. 

If it fails to insert an item it returns a QueueError::Full.

```rust
use queued_rust::{Queue};

fn main() {
    // Creating a sized queue
    println!("\n\nTesting Out Sized Queues\n");
    let mut sized_queue = Queue::new_sized(2, true); // Queue with max size of two items

    // These two will work good
    if let Err(error) = sized_queue.try_add(1) {
        eprintln!("{}", error);
    }
    if let Err(error) = sized_queue.try_add(2) {
        eprintln!("{}", error);
    }

    // This will fail
    if let Err(error) = sized_queue.try_add(3) {
        eprintln!("{}", error);
    }

    println!("Printing items from sized queue");
    for item in sized_queue {
        println!("{}", item);
    }
}
```

## Future Plans
- Create a queue load balancer
- Allow an interface for queues with channels 
---