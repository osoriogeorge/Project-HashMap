class HashMap {
  capacity;
  loadFactor;
  buckets;

  constructor(capacity = 16, loadFactor = 0.8) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    if (this.needsResizing()) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return null;
    }
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    }
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    }
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        count += this.buckets[i].length;
      }
    }
    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < oldBuckets.length; i++) {
      if (oldBuckets[i]) {
        for (let j = 0; j < oldBuckets[i].length; j++) {
          const [key, value] = oldBuckets[i][j];
          this.set(key, value);
        }
      }
    }
  }

  needsResizing() {
    return this.length() / this.capacity >= this.loadFactor;
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          keysArray.push(this.buckets[i][j][0]);
        }
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          valuesArray.push(this.buckets[i][j][1]);
        }
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          entriesArray.push(this.buckets[i][j]);
        }
      }
    }
    return entriesArray;
  }
}

const map = new HashMap();
/*keys()*/
map.set("name", "Juan");
map.set("age", 30);
map.set("city", "Madrid");
map.set("Village", "Bassens");

/*values()*/
console.log(map.values());
/*entries()*/
console.log(map.entries());

/*get(key)*/
console.log(map.get("name")); // "Juan"
console.log(map.get("country")); // null (key no exist)

/*has(key)*/
console.log(map.has("age")); // true
console.log(map.has("country")); // false

/*remove(key)*/
map.remove("city");
console.log(map.entries());

/*length()*/
console.log(map.length());

/*clear()*/
map.clear();
console.log(map.entries());
