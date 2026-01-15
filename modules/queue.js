let queue = [];

function queueModule() {
  return `
    <h2>Queue Visualizer</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <button onclick="toggleInstructions('queueInstructions')" class="instruction-toggle">Show Instructions</button>
      <button onclick="toggleInstructions('queueComplexity')" class="instruction-toggle">Time Complexity</button>
      <button onclick="toggleInstructions('queueSpace')" class="instruction-toggle">Space Complexity</button>
    </div>

    <div id="queueInstructions" class="instruction-box" style="display: none;">
      📘 <strong>Instructions:</strong><br>
      Enter a value and click "Enqueue" to add it to the rear of the queue.<br>
      Click "Dequeue" to remove from the front.<br>
      "Clear" will reset the entire queue.<br>
      FIFO (First-In-First-Out) logic is used and visualized from left to right.
    </div>

    <div id="queueComplexity" class="instruction-box" style="display: none;">
      ⏱ <strong>Time Complexity:</strong><br>
      
      - Enqueue/Dequeue: <code>O(1)</code>

      <div id="queueTimeExplain" class="instruction-box">
  🔍 <strong>Why O(1) Time?</strong><br>
  Enqueue adds to the rear, Dequeue removes from the front.  
  Both operations happen in constant time with no iteration.
</div>
    </div>

    <div id="queueSpace" class="instruction-box" style="display: none;">
      🧠 <strong>Space Complexity:</strong><br>
      
      - Queue using Array: <code>O(n)</code>

      <div id="queueSpaceExplain" class="instruction-box">
  🔍 <strong>Why O(n) Space?</strong><br>
  Every element in the queue uses space.  
  With <code>n</code> items, memory grows linearly → <code>O(n)</code>.
</div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px; align-items: center;">
      <input 
        type="text" 
        id="queueInput" 
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
          width: 200px;
          margin-top:10px;
        "
      />

      <button onclick="enqueue()">Enqueue</button>
      <button onclick="dequeue()">Dequeue</button>
      <button onclick="clearQueue()">Clear</button>
    </div>

    <canvas id="queueCanvas" width="1000" height="200" style="margin-top: 20px; background:#1a1a1a; display: block; border-radius: 10px;"></canvas>
  `;
}


function drawQueue() {
    const canvas = document.getElementById("queueCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const boxWidth = 100;
    const boxHeight = 40;
    const startX = 50;
    const startY = canvas.height / 2 - boxHeight / 2;
  
    for (let i = 0; i < queue.length; i++) {
      const x = startX + i * (boxWidth + 10);
  
      ctx.fillStyle = "#6b00a9";
      ctx.fillRect(x, startY, boxWidth, boxHeight);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(x, startY, boxWidth, boxHeight);
  
      // Updated font size inside node
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(queue[i], x + boxWidth / 2, startY + boxHeight / 2);
    }
  
    if (queue.length > 0) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px Arial";
      ctx.fillText("Front", startX + 50, startY - 20);
  
      const rearX = startX + (queue.length - 1) * (boxWidth + 10);
      ctx.fillText("Rear", rearX + 50, startY + boxHeight + 20);
    }
  }

  window.enqueue = function () {
    const input = document.getElementById("queueInput").value.trim();
    if (!input) return;
    queue.push(input);
    document.getElementById("queueInput").value = "";
    drawQueue();
  };
  
  window.dequeue = function () {
    if (queue.length === 0) return;
    queue.shift();
    drawQueue();
  };
  
  window.clearQueue = function () {
    queue = [];
    drawQueue();
  };
  