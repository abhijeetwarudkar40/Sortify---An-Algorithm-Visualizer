function linkedListModule() {
  return `
    <h2>Linked List Visualization</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <button onclick="toggleInstructions('llInstructions')" class="instruction-toggle">Show Instructions</button>
      <button onclick="toggleInstructions('llComplexity')" class="instruction-toggle">Time Complexity</button>
      <button onclick="toggleInstructions('llSpace')" class="instruction-toggle">Space Complexity</button>
    </div>

    <div id="llInstructions" class="instruction-box" style="display: none;">
      📘 <strong>Instructions:</strong><br>
      Choose a type of linked list. Use insert, delete, and search functions. Visualization updates on each action.
    </div>

    <div id="llComplexity" class="instruction-box" style="display: none;">
      ⏱ <strong>Time Complexity:</strong><br>
      
      - Insert/Delete at head: <code>O(1)</code><br>
      - Search: <code>O(n)</code>
      <div id="llTimeExplain" class="instruction-box">
  🔍 <strong>Why O(1) and O(n) Time?</strong><br>
  - Inserting at head → <code>O(1)</code><br>
  - Searching/traversing → <code>O(n)</code>
</div>
    </div>

    <div id="llSpace" class="instruction-box" style="display: none;">
      🧠 <strong>Space Complexity:</strong><br>
      
      - Singly: <code>O(n)</code><br>
      - Doubly: <code>O(n)</code> (extra pointer)<br>
      - Circular: <code>O(n)</code>
      <div id="llSpaceExplain" class="instruction-box">
  🔍 <strong>Why O(n) Space?</strong><br>
  Each node stores a value and pointer.  
  With <code>n</code> nodes, space grows linearly.
</div>
    </div>

    <!-- Unified input row -->
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px; align-items: center;">

      <select id="listType" onchange="resetLinkedList()" aria-label="Select List Type" style="
        padding: 8px 12px;
        font-size: 16px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #964734;
        border-radius: 10px;
        color: grey;
        backdrop-filter: blur(5px);
        outline: none;
        height: 40px;
        margin-top: 8px;
      ">
        <option value="singly">Singly</option>
        <option value="doubly">Doubly</option>
        <option value="circular">Circular</option>
      </select>

      <input 
        type="text" 
        id="llValue" 
        placeholder="Enter Value" 
        style="
          padding: 8px 12px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #964734;
          border-radius: 10px;
          color: white;
          backdrop-filter: blur(5px);
          outline: none;
          height: 40px;
          width: 160px;
          margin-top: 8px;
        "
      />

      <button onclick="insertAtBeginning()">Insert Start</button>
      <button onclick="insertAtEnd()">Insert End</button>
      <button onclick="deleteFromStart()">Delete Start</button>
      <button onclick="deleteFromEnd()">Delete End</button>
      <button onclick="clearList()">Clear</button>

      <input 
        type="number" 
        id="searchValue" 
        placeholder="Search value" 
        style="
          padding: 8px 12px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #964734;
          border-radius: 10px;
          color: white;
          backdrop-filter: blur(5px);
          outline: none;
          height: 40px;
          width: 150px;
          margin-top: 8px
        "
      />
      <button onclick="searchLinkedList()">Search</button>
    </div>

    <canvas id="linkedListCanvas" width="1000" height="300" style="margin-top: 20px; background:#1a1a1a;"></canvas>
    <p id="feedbackMessage" style="color: green; font-weight: bold;"></p>
  `;
}



class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class DoublyListNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

let llHead = null;
let dllHead = null, dllTail = null;
let cllHead = null;

let history = [];
let historyIndex = -1;

function resetLinkedList() {
  llHead = null;
  dllHead = null;
  dllTail = null;
  cllHead = null;
  drawLinkedList();
  drawDoublyLinkedList();
  drawCircularLinkedList();
  updateHistory();
}

function getInputValue(id) {
  const value = parseInt(document.getElementById(id).value);
  if (isNaN(value)) {
    showMessage("Please enter a valid number.");
    return null;
  }
  return value;
}

function getListType() {
  return document.getElementById("listType").value;
}

function updateHistory() {
  history.push({
    llHead: llHead,
    dllHead: dllHead,
    dllTail: dllTail,
    cllHead: cllHead
  });
  historyIndex++;
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    const state = history[historyIndex];
    llHead = state.llHead;
    dllHead = state.dllHead;
    dllTail = state.dllTail;
    cllHead = state.cllHead;
    drawLinkedList();
    drawDoublyLinkedList();
    drawCircularLinkedList();
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    const state = history[historyIndex];
    llHead = state.llHead;
    dllHead = state.dllHead;
    dllTail = state.dllTail;
    cllHead = state.cllHead;
    drawLinkedList();
    drawDoublyLinkedList();
    drawCircularLinkedList();
  }
}

function insertAtBeginning() {
  const value = getInputValue("llValue");
  if (value === null) return;

  const type = getListType();
  if (type === "singly") {
    const newNode = new ListNode(value);
    newNode.next = llHead;
    llHead = newNode;
    drawLinkedList();
  } else if (type === "doubly") {
    const newNode = new DoublyListNode(value);
    if (!dllHead) {
      dllHead = dllTail = newNode;
    } else {
      newNode.next = dllHead;
      dllHead.prev = newNode;
      dllHead = newNode;
    }
    drawDoublyLinkedList();
  } else {
    const newNode = new ListNode(value);
    if (!cllHead) {
      cllHead = newNode;
      cllHead.next = cllHead;
    } else {
      let temp = cllHead;
      while (temp.next !== cllHead) temp = temp.next;
      newNode.next = cllHead;
      temp.next = newNode;
      cllHead = newNode;
    }
    drawCircularLinkedList();
  }
  updateHistory();
}

function insertAtEnd() {
  const value = getInputValue("llValue");
  if (value === null) return;

  const type = getListType();
  if (type === "singly") {
    const newNode = new ListNode(value);
    if (!llHead) {
      llHead = newNode;
    } else {
      let temp = llHead;
      while (temp.next) temp = temp.next;
      temp.next = newNode;
    }
    drawLinkedList();
  } else if (type === "doubly") {
    const newNode = new DoublyListNode(value);
    if (!dllHead) {
      dllHead = dllTail = newNode;
    } else {
      dllTail.next = newNode;
      newNode.prev = dllTail;
      dllTail = newNode;
    }
    drawDoublyLinkedList();
  } else {
    const newNode = new ListNode(value);
    if (!cllHead) {
      cllHead = newNode;
      cllHead.next = cllHead;
    } else {
      let temp = cllHead;
      while (temp.next !== cllHead) temp = temp.next;
      temp.next = newNode;
      newNode.next = cllHead;
    }
    drawCircularLinkedList();
  }
  updateHistory();
}

function deleteFromStart() {
  const type = getListType();

  if (type === "singly" && llHead) {
    llHead = llHead.next;
    drawLinkedList();
  } else if (type === "doubly" && dllHead) {
    dllHead = dllHead.next;
    if (dllHead) dllHead.prev = null;
    else dllTail = null;
    drawDoublyLinkedList();
  } else if (type === "circular" && cllHead) {
    if (cllHead.next === cllHead) {
      cllHead = null;
    } else {
      let temp = cllHead;
      while (temp.next !== cllHead) temp = temp.next;
      cllHead = cllHead.next;
      temp.next = cllHead;
    }
    drawCircularLinkedList();
  }
  updateHistory();
}

function deleteFromEnd() {
  const type = getListType();

  if (type === "singly" && llHead) {
    if (!llHead.next) {
      llHead = null;
    } else {
      let temp = llHead;
      while (temp.next.next) temp = temp.next;
      temp.next = null;
    }
    drawLinkedList();
  } else if (type === "doubly" && dllTail) {
    if (dllHead === dllTail) {
      dllHead = dllTail = null;
    } else {
      dllTail = dllTail.prev;
      dllTail.next = null;
    }
    drawDoublyLinkedList();
  } else if (type === "circular" && cllHead) {
    if (cllHead.next === cllHead) {
      cllHead = null;
    } else {
      let temp = cllHead;
      while (temp.next.next !== cllHead) temp = temp.next;
      temp.next = cllHead;
    }
    drawCircularLinkedList();
  }
  updateHistory();
}

function clearList() {
  resetLinkedList();
}

function searchLinkedList() {
  const value = getInputValue("searchValue");
  if (value === null) return;

  const type = getListType();
  let found = false;

  if (type === "singly") {
    let index = 0, current = llHead;
    const searchInterval = setInterval(() => {
      drawLinkedList(index);
      if (!current) {
        if (!found) showMessage("Node not found!");
        return clearInterval(searchInterval);
      }
      if (current.value === value) {
        found = true;
        showMessage("Node found!");
        return clearInterval(searchInterval);
      }
      current = current.next;
      index++;
    }, 500);
  } else if (type === "doubly") {
    let index = 0, current = dllHead;
    const searchInterval = setInterval(() => {
      drawDoublyLinkedList(index);
      if (!current) {
        if (!found) showMessage("Node not found!");
        return clearInterval(searchInterval);
      }
      if (current.value === value) {
        found = true;
        showMessage("Node found!");
        return clearInterval(searchInterval);
      }
      current = current.next;
      index++;
    }, 500);
  } else if (type === "circular") {
    if (!cllHead) return;
    let index = 0, current = cllHead;
    const searchInterval = setInterval(() => {
      drawCircularLinkedList(index);
      if (current.value === value) {
        found = true;
        showMessage("Node found!");
        return clearInterval(searchInterval);
      }
      current = current.next;
      index++;
      if (current === cllHead) {
        if (!found) showMessage("Node not found!");
        return clearInterval(searchInterval);
      }
    }, 500);
  }
}


function showMessage(message) {
  const feedback = document.getElementById("feedbackMessage");
  feedback.textContent = message;
  setTimeout(() => {
    feedback.textContent = "";
  }, 2000);  // Clear message after 2 seconds
}
function getInputValue(id) {
  const value = parseInt(document.getElementById(id).value);
  if (isNaN(value)) {
    showMessage("Please enter a valid number.");
    return null;  // Return null if the input is invalid
  }
  return value;
}

function drawNodeBox(ctx, value, x, y, color = '#90EE90') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 80, 40);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(x, y, 80, 40);

  ctx.fillStyle = 'black';
  ctx.font = 'bold 20px Arial'; // ✅ Increased font size here
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x + 40, y + 20); // ✅ Centered text
}


function drawArrow(ctx, fromX, fromY, toX, toY, color = 'white') {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - 5 * Math.cos(angle - Math.PI / 6), toY - 5 * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - 5 * Math.cos(angle + Math.PI / 6), toY - 5 * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
function drawLinkedList(highlightIndex = -1) {
  const canvas = document.getElementById("linkedListCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let current = llHead,
      x = 20,
      y = 80,
      index = 0;
  
  while (current) {
    let color = "#90EE90";  // Default node color
    if (index === highlightIndex) color = "yellow";  // Highlight the node on search
    if (index === 0) color = "#1E90FF";  // Head node (blue)
    if (!current.next) color = "#FF8C00";  // Tail node (orange)
    
    drawNodeBox(ctx, current.value, x, y, color);
    if (current.next) drawArrow(ctx, x + 80, y + 20, x + 100, y + 20);
    current = current.next;
    x += 100;
    index++;
  }
}


function drawDoublyLinkedList(highlightIndex = -1) {
  const canvas = document.getElementById("linkedListCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let current = dllHead,
    x = 20,
    y = 80,
    index = 0;
  while (current) {
    const color = index === highlightIndex ? "yellow" : "#90EE90";
    drawNodeBox(ctx, current.value, x, y, color);
    if (current.next) drawArrow(ctx, x + 80, y + 15, x + 100, y + 15, "#00bcd4");
    if (current.prev) drawArrow(ctx, x, y + 25, x - 20, y + 25, "#ff5722");
    current = current.next;
    x += 100;
    index++;
  }
}

function drawDoublyLinkedList(highlightIndex = -1) {
  const canvas = document.getElementById("linkedListCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let current = dllHead,
      x = 20,
      y = 80,
      index = 0;

  while (current) {
    let color = "#90EE90";  // Default node color
    if (index === highlightIndex) color = "yellow";  // Highlight the node on search
    if (index === 0) color = "#1E90FF";  // Head node (blue)
    if (!current.next) color = "#FF8C00";  // Tail node (orange)
    
    drawNodeBox(ctx, current.value, x, y, color);
    if (current.next) drawArrow(ctx, x + 80, y + 15, x + 100, y + 15, "#00bcd4");
    if (current.prev) drawArrow(ctx, x, y + 25, x - 20, y + 25, "#ff5722");
    current = current.next;
    x += 100;
    index++;
  }
}



resetLinkedList(); // Initialize linked list when the page loads