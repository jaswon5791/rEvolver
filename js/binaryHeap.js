//binaryHeap class modified from http://whitepaperclip.com/2012/11/binary-max-heap-in-javascript/


var binaryHeap = function () {

// This heap uses an array for its backbone.

    var nodes = [],

// The swap and sift methods should be private.

        swap = function (a, b) {
            var temp = nodes[a];
            nodes[a] = nodes[b];
            nodes[b] = temp;
        },

        siftDown = function(index) {
            var leftChild,
                rightChild,
                swapIndex;

            for (;;) {
                leftChild = (index << 1) + 1;
                rightChild = leftChild + 1;
                swapIndex = index;

// Compare the left child with the current position.

                if (leftChild < nodes.length) {
                    if (nodes[leftChild].getScore() > nodes[swapIndex].getScore()) {
                        swapIndex = leftChild;
                    }
                }

// Compare the right child with the current position.

                if (rightChild < nodes.length) {
                    if (nodes[rightChild].getScore() > nodes[swapIndex].getScore()) {
                        swapIndex = rightChild;
                    }
                }

// If the swap index was set, perform the swap.

                if (swapIndex !== index) {
                    swap(swapIndex, index);
                    index = swapIndex;
                } else {
                    break;
                }
            }
        },

        siftUp = function (index) {
            var parentIndex;

// Stop sifting up if we hit the root.

            while (index > 0) {
                parentIndex = (index - 1) >> 1;

// If we haven't hit the root, compare the nodes.

                if (nodes[index].getScore() > nodes[parentIndex].getScore()) {
                    swap(index, parentIndex);
                    index = parentIndex;
                }
            }
        };

    return {
        pop: function () {
            var value = nodes[0];

            if (value === null) {
                return null;
            }

// When popping an element, we want to move the last element to the front.

            if (nodes.length > 0) {
                nodes[0] = nodes.pop();
                siftDown(0);
            }

            return value;
        },

        push: function (value) {

// When adding an element, push the value onto the end of the list
// and sift it up the heap until it either becomes the root or would
// be larger than its parent.

            nodes.push(value);
            siftUp(nodes.length - 1);
        }
    };
};
