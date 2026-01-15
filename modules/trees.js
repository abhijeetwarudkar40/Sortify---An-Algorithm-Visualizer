function treesModule() {
  return `
    <h2>Binary Search Tree (BST)</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <button onclick="toggleInstructions('treeInstructions')" class="instruction-toggle">Show Instructions</button>
      <button onclick="toggleInstructions('treeComplexity')" class="instruction-toggle">Time Complexity</button>
      <button onclick="toggleInstructions('treeSpace')" class="instruction-toggle">Space Complexity</button>
    </div>

    <div id="treeInstructions" class="instruction-box" style="display: none;">
      📘 <strong>Instructions:</strong><br>
      Insert values to build a Binary Search Tree (BST). You can search, delete, and animate traversals (inorder, preorder, postorder).
    </div>

    <div id="treeComplexity" class="instruction-box" style="display: none;">
      ⏱ <strong>Time Complexity:</strong><br>
      - Insert/Search/Delete (avg): <code>O(log n)</code><br>
      - Worst (unbalanced): <code>O(n)</code>

      <div id="treeTimeExplain" class="instruction-box">
        🔍 <strong>Why O(log n) or O(n) Time?</strong><br>
        - A balanced BST splits search paths → <code>O(log n)</code><br>
        - An unbalanced (skewed) tree becomes a list → <code>O(n)</code>
      </div>
    </div>

    <div id="treeSpace" class="instruction-box" style="display: none;">
      🧠 <strong>Space Complexity:</strong><br>
      - Average: <code>O(log n)</code> (balanced)<br>
      - Worst: <code>O(n)</code> (skewed tree)

      <div id="treeSpaceExplain" class="instruction-box">
  🔍 <strong>Why O(log n) or O(n) Space?</strong><br>
  - Recursive calls go as deep as the tree height<br>
  - Balanced → <code>O(log n)</code>, Skewed → <code>O(n)</code>
</div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px; align-items: center;">
      <input 
        type="number" 
        id="bstInput" 
        placeholder="Enter value to Insert" 
        style="padding: 8px 12px; font-size: 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid #964734; border-radius: 10px; color: white; backdrop-filter: blur(5px); outline: none; min-width: 150px; flex: 1; height: 40px; box-sizing: border-box; margin-top:10px;"/>
      <button onclick="insertBST()">Insert</button>

      <input 
        type="number" 
        id="bstSearchInput" 
        placeholder="Enter value to Search" 
        style="padding: 8px 12px; font-size: 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid #964734; border-radius: 10px; color: white; backdrop-filter: blur(5px); outline: none; min-width: 150px; flex: 1; height: 40px; box-sizing: border-box; margin-top:10px;"/>
      <button onclick="searchBST()">Search</button>

      <input 
        type="number" 
        id="bstDeleteInput" 
        placeholder="Enter value to Delete" 
        style="padding: 8px 12px; font-size: 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid #964734; border-radius: 10px; color: white; backdrop-filter: blur(5px); outline: none; min-width: 150px; flex: 1; height: 40px; box-sizing: border-box; margin-top:10px;"/>
      <button onclick="deleteBST()">Delete</button>

      <button onclick="clearBST()" style="flex-shrink: 0;">Clear</button>
    </div>

    <canvas id="treeCanvas" width="1000" height="500" style="margin-top: 20px; background: #1a1a1a; display: block;"></canvas>
  `;
}


let bstRoot = null;

class TreeNode {
  constructor(val, x = 500, y = 40, depth = 0) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
    this.depth = depth;
    this.highlight = false;
  }
}

function insertBST() {
  const value = parseInt(document.getElementById('bstInput').value);
  if (isNaN(value)) return;
  bstRoot = insertIntoBST(bstRoot, value);
  updateNodePositions(bstRoot);
  drawBST();
}

function deleteBST() {
  const value = parseInt(document.getElementById('bstDeleteInput').value);
  if (isNaN(value)) return;
  bstRoot = deleteNode(bstRoot, value);
  updateNodePositions(bstRoot);
  drawBST();
}

function searchBST() {
  const value = parseInt(document.getElementById('bstSearchInput').value);
  if (isNaN(value)) return;

  removeHighlights(bstRoot);
  searchAndHighlight(bstRoot, value);
  updateNodePositions(bstRoot);
  drawBST();

  setTimeout(() => {
    removeHighlights(bstRoot);
    drawBST();
  }, 2000);
}

function insertIntoBST(root, val, x = 500, y = 40, depth = 0) {
  if (!root) return new TreeNode(val, x, y, depth);
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
}

function deleteNode(root, key) {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let successor = findMin(root.right);
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
}

function findMin(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

function searchAndHighlight(node, value) {
  if (!node) return;

  node.highlight = true;
  if (node.val === value) return;
  else if (value < node.val) searchAndHighlight(node.left, value);
  else searchAndHighlight(node.right, value);
}

function removeHighlights(node) {
  if (!node) return;
  node.highlight = false;
  removeHighlights(node.left);
  removeHighlights(node.right);
}

function updateNodePositions(node, x = 500, y = 40, depth = 0) {
  if (!node) return;
  const gap = 80 - depth * 10;
  node.x = x;
  node.y = y;
  node.depth = depth;
  updateNodePositions(node.left, x - gap, y + 70, depth + 1);
  updateNodePositions(node.right, x + gap, y + 70, depth + 1);
}

function drawBST() {
  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!bstRoot) return;
  drawNode(ctx, bstRoot);
}

function drawNode(ctx, node) {
  if (!node) return;

  ctx.strokeStyle = '#00bcd4';
  ctx.lineWidth = 2;

  if (node.left) {
    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(node.left.x, node.left.y);
    ctx.stroke();
  }

  if (node.right) {
    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(node.right.x, node.right.y);
    ctx.stroke();
  }

  // Draw node
  ctx.beginPath();
  ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = node.highlight ? '#ff4081' : '#00bcd4';
  ctx.fill();

  // Node value
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '16px Arial';
  ctx.fillText(node.val, node.x, node.y);

  drawNode(ctx, node.left);
  drawNode(ctx, node.right);
}

function clearBST() {
  bstRoot = null;
  drawBST();
}
