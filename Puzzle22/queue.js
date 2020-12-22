const Queue = function (...datas) {
    this.first = null;
    this.size = 0;
    this.enqueue(...datas);
};

const Node = function (data) {
    this.data = data;
    this.next = null;
};

Queue.prototype.enqueue = function (...datas) {
    let n = this.first;
    while (n !== null && n.next !== null) {
        n = n.next;
    }
    for (const data of datas) {
        if (!this.first) {
            this.first = new Node(data);
            n = this.first;
        } else {
            n.next = new Node(data);
            n = n.next;
        }
        this.size += 1;
    }
    return n;
};

Queue.prototype.dequeue = function () {
    let temp = this.first;
    this.first = this.first.next;
    this.size -= 1;
    return temp;
};

Queue.prototype.toArray = function () {
    const result = new Array(this.size);
    let i = 0;
    let nextNode = this.first;
    while (i !== this.size) {
        result[i] = nextNode.data;
        nextNode = nextNode.next;
        i++;
    }
    return result;
}

Queue.prototype.slice = function (start = 0, end = this.size) {
    if (start < 0 || end > this.size || start > end) {
        console.log("Error. Invalid input");
        return null;
    } else {
        let ans = new Queue();
        let firstOfAns = this.first;
        for (let i = 0; i < end; i++) {
            if (i < start) {
                firstOfAns = firstOfAns.next;
                continue;
            } else {
                ans.enqueue(firstOfAns && firstOfAns.data);
                firstOfAns = firstOfAns.next;
            }
        }
        return ans;
    }
}

module.exports = {
    Queue: Queue,
    Node: Node
}