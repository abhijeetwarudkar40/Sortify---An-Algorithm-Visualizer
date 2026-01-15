function graphModule() {
  setTimeout(setupGraphCanvas, 100);
  return `
    <h2>Graph Traversal</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <button onclick="toggleInstructions('graphInstructions')" class="instruction-toggle">Show Instructions</button>
      <button onclick="toggleInstructions('graphComplexity')" class="instruction-toggle">Time Complexity</button>
      <button onclick="toggleInstructions('graphSpace')" class="instruction-toggle">Space Complexity</button>
    </div>

    <div id="graphInstructions" class="instruction-box" style="display: none;">
      📘 <strong>Instructions:</strong><br>
      Click to add nodes. Click two nodes to connect with an edge. Use BFS or DFS to visualize graph traversal. “Reset” clears the graph.
    </div>

    <div id="graphComplexity" class="instruction-box" style="display: none;">
      ⏱ <strong>Time Complexity:</strong><br>
      BFS / DFS: <code>O(V + E)</code>

      <div id="graphTimeExplain" class="instruction-box">
  🔍 <strong>Why O(V + E) Time?</strong><br>
  In BFS/DFS, each node (V) and edge (E) is visited once.  
  That’s why time depends on both → <code>O(V + E)</code>
</div>
    </div>

    <div id="graphSpace" class="instruction-box" style="display: none;">
      🧠 <strong>Space Complexity:</strong><br>
      
      - Adjacency List: <code>O(V + E)</code><br>
      - Visited Array: <code>O(V)</code>

      <div id="graphSpaceExplain" class="instruction-box">
  🔍 <strong>Why O(V + E) Space?</strong><br>
  Adjacency list stores each node and its edges.  
  Plus space for visited tracking → <code>O(V + E)</code>
</div>
    </div>

    <p>Click to add nodes. Click two nodes to create an edge.</p>
    <div style="margin-bottom: 10px;">
      <button onclick="runDFS(0)">Run DFS</button>
      <button onclick="runBFS(0)">Run BFS</button>
      <button onclick="clearGraph()">Clear Graph</button>
    </div>
    <canvas id="graphCanvas" width="1000" height="500" style="margin-top: 20px; background:#1a1a1a; display: block; border-radius: 10px;"></canvas>
  `;
}

let nodes = [];
let edges = [];
let selectedNode = null;

function drawGraph() {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw edges
  ctx.strokeStyle = '#00bcd4';
  ctx.lineWidth = 2;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });

  // Draw nodes
  nodes.forEach((node, i) => {
    ctx.fillStyle = node.visited ? 'orange' : (selectedNode === i ? '#00796b' : '#00bcd4');
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(i, node.x, node.y);
  });
}

function setupGraphCanvas() {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) return;
  canvas.onclick = function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let clickedIndex = -1;
    nodes.forEach((n, i) => {
      if (Math.hypot(n.x - x, n.y - y) <= 20) clickedIndex = i;
    });

    if (clickedIndex === -1) {
      nodes.push({ x, y, visited: false });
      selectedNode = null;
    } else {
      if (selectedNode === null) {
        selectedNode = clickedIndex;
      } else if (selectedNode !== clickedIndex) {
        edges.push([selectedNode, clickedIndex]);
        selectedNode = null;
      } else {
        selectedNode = null;
      }
    }
    drawGraph();
  };
  drawGraph();
}

function runDFS(start) {
  if (!nodes[start]) return;
  nodes.forEach(n => n.visited = false);
  let stack = [start];

  const visitNext = () => {
    if (stack.length === 0) return;
    let curr = stack.pop();
    if (!nodes[curr].visited) {
      nodes[curr].visited = true;
      drawGraph();
      setTimeout(() => {
        const neighbors = edges.filter(e => e[0] === curr || e[1] === curr)
          .map(e => e[0] === curr ? e[1] : e[0]);
        neighbors.reverse().forEach(n => {
          if (!nodes[n].visited) stack.push(n);
        });
        visitNext();
      }, 500);
    } else {
      visitNext();
    }
  };

  visitNext();
}

function runBFS(start) {
  if (!nodes[start]) return;
  nodes.forEach(n => n.visited = false);
  const queue = [start];
  nodes[start].visited = true;

  const visitNext = () => {
    if (queue.length === 0) return;
    const curr = queue.shift();
    drawGraph();
    setTimeout(() => {
      const neighbors = edges.filter(e => e[0] === curr || e[1] === curr)
        .map(e => e[0] === curr ? e[1] : e[0]);
      neighbors.forEach(n => {
        if (!nodes[n].visited) {
          nodes[n].visited = true;
          queue.push(n);
        }
      });
      visitNext();
    }, 500);
  };

  visitNext();
}

function clearGraph() {
  nodes = [];
  edges = [];
  selectedNode = null;
  drawGraph();
}
