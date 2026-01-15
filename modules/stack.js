function stackModule() {
  return `
    <h2>Stack Visualization</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <button onclick="toggleInstructions('stackInstructions')" class="instruction-toggle">Show Instructions</button>
      <button onclick="toggleInstructions('stackComplexity')" class="instruction-toggle">Time Complexity</button>
      <button onclick="toggleInstructions('stackSpace')" class="instruction-toggle">Space Complexity</button>
    </div>

    <div id="stackInstructions" class="instruction-box" style="display: none;">
      📘 <strong>Instructions:</strong><br>
      Enter a value and click <strong>Push</strong> to add to the top of the stack.
      <strong>Pop</strong> removes the top value. <strong>Clear</strong> empties the entire stack.
      Visual stack updates in real-time.
    </div>

    <div id="stackComplexity" class="instruction-box" style="display: none;">
      ⏱ <strong>Time Complexity:</strong><br>
      <div id="stackTimeExplain" class="instruction-box">
  🔍 <strong>Time Complexity Explanation:</strong><br>
  Stack operations like <code>push</code> and <code>pop</code> access only the top element.<br>
  No loops or nested iterations — each action is constant time.<br>
  ➤ That's why it's <code>O(1)</code>.
</div>
      - Push/Pop: <code>O(1)</code>
    </div>

    <div id="stackSpace" class="instruction-box" style="display: none;">
      🧠 <strong>Space Complexity:</strong><br>
      <div id="stackSpaceExplain" class="instruction-box">
  🔍 <strong>Space Complexity Explanation:</strong><br>
  Each element occupies a fixed space in memory.<br>
  So if there are <code>n</code> elements, space required grows linearly → <code>O(n)</code>.
</div>
      - Stack using Array: <code>O(n)</code>
    </div>

    <div class="input-group">
      <input 
        type="text" 
        id="stackInput" 
        placeholder="Enter Value" 
        style="
          flex: 2;
          padding: 7px 15px; 
          font-size: 18px; 
          background: rgba(255, 255, 255, 0.05); 
          border: 1px solid #964734; 
          border-radius: 10px; 
          color: white; 
          backdrop-filter: blur(5px); 
          outline: none;
          min-width: 200px;
          margin-top:10px;
          margin-right: 10px;
        "
      />
      <button onclick="pushToStack()">Push</button>
      <button onclick="popFromStack()">Pop</button>
      <button onclick="clearStack()">Clear</button>
    </div>

    <canvas id="stackCanvas" width="800" height="400" style="margin-top: 20px; background: #1a1a1a; border-radius: 10px;"></canvas>
  `;
}


let stack = [];

window.pushToStack = function () {
  const input = document.getElementById("stackInput").value.trim();
  if (!input) return;
  stack.push(input);
  document.getElementById("stackInput").value = '';
  drawStack();
};

window.popFromStack = function () {
  if (stack.length === 0) return;
  stack.pop();
  drawStack();
};

window.clearStack = function () {
  stack = [];
  drawStack();
};

function drawStack() {
  const canvas = document.getElementById("stackCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const boxWidth = 100;
  const boxHeight = 40;
  const gap = 10;
  const startX = canvas.width / 2 - boxWidth / 2;
  const startY = 20;

  for (let i = stack.length - 1; i >= 0; i--) {
    const y = startY + (stack.length - 1 - i) * (boxHeight + gap);

    ctx.fillStyle = "#6b00a9";
    ctx.fillRect(startX, y, boxWidth, boxHeight);

    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(startX, y, boxWidth, boxHeight);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(stack[i], startX + boxWidth / 2, y + boxHeight / 2);
  }

  // Label "Top" aligned with the last pushed box
  if (stack.length > 0) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Top", startX + boxWidth / 2, startY - 10);
  }
}
