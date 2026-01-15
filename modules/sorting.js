function sortingModule() {
  return `
    <h2>Sorting Algorithms</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <button onclick="toggleInstructions('sortInstructions')" class="instruction-toggle">Show Instructions</button>
      <button onclick="toggleInstructions('sortComplexity')" class="instruction-toggle">Time Complexity</button>
      <button onclick="toggleInstructions('sortSpace')" class="instruction-toggle">Space Complexity</button>
    </div>

    <div id="sortInstructions" class="instruction-box" style="display: none;">
      📘 <strong>Instructions:</strong>
      Enter array values (comma-separated) and choose a sorting algorithm to visualize. Green = correct order, Red = incorrect.
    </div>

    <div id="sortComplexity" class="instruction-box" style="display: none;">
      ⏱ <strong>Time Complexity:</strong><br>
      
      - Bubble / Selection / Insertion: <code>O(n²)</code><br>
      - Merge / Quick (avg): <code>O(n log n)</code>

      <div id="sortTimeExplain" class="instruction-box">
        🔍 <strong>Why O(n²) or O(n log n) Time?</strong><br>
        - Simple sorts (Bubble, Insertion, Selection) use nested loops → <code>O(n²)</code><br>
        - Efficient sorts (Merge, Quick) split & conquer → <code>O(n log n)</code>
    </div>
    </div>

    <div id="sortSpace" class="instruction-box" style="display: none;">
      🧠 <strong>Space Complexity:</strong><br>
      - Bubble / Selection / Insertion: <code>O(1)</code><br>
      - Merge Sort: <code>O(n)</code><br>
      - Quick Sort: <code>O(log n)</code>

      <div id="sortSpaceExplain" class="instruction-box">
  🔍 <strong>Why O(1) or O(n) Space?</strong><br>
        - In-place sorts (Bubble, Selection) don’t use extra space → <code>O(1)</code><br>
        - Merge sort uses extra arrays → <code>O(n)</code>
      </div>
    </div>

    <p>Enter array values (comma separated) and select an algorithm:</p>
    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px;">
      <input 
        type="text" 
        id="userArray" 
        placeholder="e.g. 5,3,8,2" 
        style="width: 90%; padding: 12px 15px; font-size: 18px; background: rgba(255, 255, 255, 0.05); border: 1px solid #964734; border-radius: 10px; margin-top: 10px; color: white; backdrop-filter: blur(5px); margin-bottom: 10px; outline: none;"
      />
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <button onclick="runBubbleSort()">Bubble Sort</button>
        <button onclick="runSelectionSort()">Selection Sort</button>
        <button onclick="runInsertionSort()">Insertion Sort</button>
        <button onclick="runQuickSort()">Quick Sort</button>
        <button onclick="runMergeSort()">Merge Sort</button>
      </div>
    </div>
    <canvas id="sortCanvas" width="800" height="400" style="margin-top: 20px; background:#1a1a1a; display: block;"></canvas>
  `;
}


function getUserArray() {
  let input = document.getElementById('userArray').value;
  return input.trim() !== ''
    ? input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    : Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
}

function runBubbleSort() {
  const ctx = document.getElementById('sortCanvas').getContext('2d');
  let arr = getUserArray();
  let i = 0, j = 0;

  const interval = setInterval(() => {
    if (i < arr.length) {
      if (j < arr.length - i - 1) {
        let highlight = {};
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          highlight[j] = 'wrong';
          highlight[j + 1] = 'wrong';
        } else {
          highlight[j] = 'correct';
          highlight[j + 1] = 'correct';
        }
        drawArray(ctx, arr, highlight);
        j++;
      } else {
        j = 0;
        i++;
      }
    } else {
      drawArray(ctx, arr);
      clearInterval(interval);
    }
  }, 500);
}

function runSelectionSort() {
  const ctx = document.getElementById('sortCanvas').getContext('2d');
  let arr = getUserArray();
  let i = 0, j = i + 1, min = i;

  const interval = setInterval(() => {
    if (i < arr.length) {
      if (j < arr.length) {
        let highlight = {};
        if (arr[j] < arr[min]) min = j;

        highlight[i] = 'correct';
        highlight[j] = (j === min) ? 'wrong' : 'correct';
        highlight[min] = 'wrong';
        drawArray(ctx, arr, highlight);
        j++;
      } else {
        if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
        i++;
        min = i;
        j = i + 1;
      }
    } else {
      drawArray(ctx, arr);
      clearInterval(interval);
    }
  }, 500);
}

function runInsertionSort() {
  const ctx = document.getElementById('sortCanvas').getContext('2d');
  let arr = getUserArray();
  let i = 1, j = i - 1, key = arr[i];

  const interval = setInterval(() => {
    if (i < arr.length) {
      if (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        drawArray(ctx, arr, { [j + 1]: 'wrong' });
        j--;
      } else {
        arr[j + 1] = key;
        i++;
        key = arr[i];
        j = i - 1;
        drawArray(ctx, arr, { [i]: 'correct' });
      }
    } else {
      drawArray(ctx, arr);
      clearInterval(interval);
    }
  }, 500);
}

function runQuickSort() {
  const ctx = document.getElementById('sortCanvas').getContext('2d');
  let arr = getUserArray();
  let actions = [];

  function quickSort(arr, low, high) {
    if (low < high) {
      let pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  function partition(arr, low, high) {
    let pivot = arr[high], i = low - 1;
    for (let j = low; j < high; j++) {
      actions.push({ compare: [j, high], pivot: high });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        actions.push({ swap: [i, j], arr: [...arr] });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    actions.push({ swap: [i + 1, high], arr: [...arr] });
    return i + 1;
  }

  quickSort([...arr], 0, arr.length - 1);

  let idx = 0;
  const interval = setInterval(() => {
    if (idx >= actions.length) {
      drawArray(ctx, arr);
      clearInterval(interval);
    } else {
      const action = actions[idx++];
      if (action.swap) {
        [arr[action.swap[0]], arr[action.swap[1]]] = [arr[action.swap[1]], arr[action.swap[0]]];
        drawArray(ctx, arr, { [action.swap[0]]: 'wrong', [action.swap[1]]: 'wrong' });
      } else if (action.compare) {
        drawArray(ctx, arr, { [action.compare[0]]: 'correct', [action.compare[1]]: 'pivot' });
      }
    }
  }, 500);
}

function runMergeSort() {
  const ctx = document.getElementById('sortCanvas').getContext('2d');
  let arr = getUserArray();
  let actions = [];

  function mergeSort(arr, l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }

  function merge(arr, l, m, r) {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      actions.push({ compare: [k], arr: [...arr] });
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }
      actions.push({ merge: k, arr: [...arr] });
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i++];
      actions.push({ merge: k, arr: [...arr] });
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j++];
      actions.push({ merge: k, arr: [...arr] });
      k++;
    }
  }

  mergeSort([...arr], 0, arr.length - 1);

  let idx = 0;
  const interval = setInterval(() => {
    if (idx >= actions.length) {
      drawArray(ctx, arr);
      clearInterval(interval);
    } else {
      const action = actions[idx++];
      if (action.merge !== undefined) {
        arr = action.arr;
        drawArray(ctx, arr, { [action.merge]: 'correct' });
      } else if (action.compare) {
        drawArray(ctx, arr, { [action.compare[0]]: 'wrong' });
      }
    }
  }, 500);
}

function drawArray(ctx, arr, highlight = {}) {
  const canvasWidth = 800;
  const canvasHeight = 400;
  const barWidth = canvasWidth / arr.length;
  const maxVal = Math.max(...arr);
  const scale = (canvasHeight - 20) / maxVal;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  arr.forEach((val, idx) => {
    const x = idx * barWidth;
    const height = val * scale;
    const y = canvasHeight - height;

    ctx.fillStyle = highlight[idx] === 'pivot' ? 'yellow' :
      highlight[idx] === 'correct' ? 'green' :
        highlight[idx] === 'wrong' ? 'red' : '#00bcd4';

    ctx.fillRect(x, y, barWidth - 2, height);

    ctx.fillStyle = height > 25 ? 'white' : (highlight[idx] ? 'black' : '#00bcd4');
    ctx.font = `${Math.max(barWidth / 3, 10)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (height > 20) {
      ctx.fillText(val, x + barWidth / 2, y + height / 2);
    } else {
      ctx.fillStyle = 'white';
      ctx.fillText(val, x + barWidth / 2, y - 10);
    }
  });
}
