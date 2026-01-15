function searchingModule() {
  return `
    <h2>Searching Algorithms</h2>
    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
      <button onclick="toggleInstructions('searchInstructions')" class="instruction-toggle">Show Instructions</button>
      <button onclick="toggleInstructions('searchComplexity')" class="instruction-toggle">Time Complexity</button>
      <button onclick="toggleInstructions('searchSpace')" class="instruction-toggle">Space Complexity</button>
    </div>

    <div id="searchInstructions" class="instruction-box" style="display: none;">
      📘 <strong>Instructions:</strong>
      Enter an array and a search key. Linear Search checks one-by-one. Binary Search requires a sorted array. Use arrows to track search progress.
    </div>

    <div id="searchComplexity" class="instruction-box" style="display: none;">
      ⏱ <strong>Time Complexity:</strong><br>
      - Linear Search: <code>O(n)</code><br>
      - Binary Search: <code>O(log n)</code> (only sorted arrays)

      <div id="searchTimeExplain" class="instruction-box">
  🔍  <strong>Why O(n) or O(log n) Time?</strong><br>
        - Linear Search checks each element one-by-one → <code>O(n)</code><br>
        - Binary Search splits array in half each step → <code>O(log n)</code>
      </div>
    </div>

    <div id="searchSpace" class="instruction-box" style="display: none;">
      🧠 <strong>Space Complexity:</strong><br>
      - Linear / Binary: <code>O(1)</code>

       <div id="searchSpaceExplain" class="instruction-box">
      🔍 <strong>Why O(1) Space?</strong><br>
        Both Linear and Binary Search don’t use extra memory.  
        They operate directly on the input array.
      </div>
    </div>

    <p>Enter array values and key to search:</p>
    
    <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 15px;">
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <input 
          type="text" 
          id="userArray" 
          placeholder="e.g. 4, 7, 2, 9" 
          style="flex: 2; padding: 12px 15px; font-size: 18px; background: rgba(255, 255, 255, 0.05); border: 1px solid #964734; border-radius: 10px; color: white; backdrop-filter: blur(5px); outline: none; min-width: 200px; margin-top:10px;"
        />
        <input 
          type="number" 
          id="searchKey" 
          placeholder="Search key" 
          style="flex: 1; padding: 12px 15px; font-size: 18px; background: rgba(255, 255, 255, 0.05); border: 1px solid #964734; border-radius: 10px; color: white; backdrop-filter: blur(5px); outline: none; min-width: 100px; margin-top:10px;"
        />
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <button onclick="runLinearSearch()">Linear Search</button>
        <button onclick="runBinarySearch()">Binary Search</button>
      </div>
    </div>

    <div id="searchArray" style="margin-top: 20px; font-size: 18px;"></div>
  `;
}


function runLinearSearch() {
  const key = parseInt(document.getElementById('searchKey').value);
  let input = document.getElementById('userArray').value;
  let array = input ? input.split(',').map(Number) : Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
  const container = document.getElementById('searchArray');
  container.innerHTML = '';

  let i = 0;
  const interval = setInterval(() => {
    const items = array.map((val, idx) => {
      const isCurrent = idx === i;
      const arrow = isCurrent ? '⬇️' : '&nbsp;';
      const color = isCurrent ? 'orange' : '#333';
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
          <div style="height: 20px; font-size: 20px;">${arrow}</div>
          <div style="padding: 10px; margin: 5px; background: ${color}; color: white; border-radius: 5px; min-width: 30px; text-align: center;">
            ${val}
          </div>
        </div>
      `;
    }).join('');
  
    container.innerHTML = `<div style="display: flex; justify-content: center; gap: 10px;">${items}</div>`;
  
    // Check result
    if (array[i] === key) {
      clearInterval(interval);
      const finalItems = array.map((val, idx) => {
        const color = idx === i ? 'green' : '#333';
        return `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
            <div style="height: 20px;">&nbsp;</div>
            <div style="padding: 10px; margin: 5px; background: ${color}; color: white; border-radius: 5px; min-width: 30px; text-align: center;">
              ${val}
            </div>
          </div>
        `;
      }).join('');
      container.innerHTML = `<div style="display: flex; justify-content: center; gap: 10px;">${finalItems}</div>`;
      container.innerHTML += `<p style="color: lightgreen; font-size: 18px; font-weught: 400;  margin-top: 10px;">Element found at index ${i}</p>`;
    } else if (i >= array.length - 1) {
      clearInterval(interval);
      container.innerHTML += `<p style="color: red; font-size: 18px; margin-top: 10px;">${key} not found</p>`;
    }
    i++;
  }, 500);
  // Smooth 500ms animation
}


function runBinarySearch() {
  const key = parseInt(document.getElementById('searchKey').value);
  let input = document.getElementById('userArray').value;
  let array = input ? input.split(',').map(Number).sort((a, b) => a - b) : Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
  const container = document.getElementById('searchArray');
  container.innerHTML = '';

  let left = 0, right = array.length - 1;

  const interval = setInterval(() => {
    if (left > right) {
      clearInterval(interval);
      container.innerHTML += `<p style="color: red; font-size: 18px; margin-top: 10px;">${key} not found</p>`;
      return;
    }

    const mid = Math.floor((left + right) / 2);

    const items = array.map((val, idx) => {
      const isMid = idx === mid;
      const arrow = isMid ? '⬇️' : '&nbsp;';
      const color = isMid ? 'orange' : '#333';
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
          <div style="height: 20px; font-size: 20px;">${arrow}</div>
          <div style="padding: 10px; margin: 5px; background: ${color}; color: white; border-radius: 5px; min-width: 30px; text-align: center;">
            ${val}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `<div style="display: flex; justify-content: center; gap: 10px;">${items}</div>`;

    if (array[mid] === key) {
      clearInterval(interval);
      const finalItems = array.map((val, idx) => {
        const color = idx === mid ? 'green' : '#333';
        return `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
            <div style="height: 20px;">&nbsp;</div>
            <div style="padding: 10px; margin: 5px; background: ${color}; color: white; border-radius: 5px; min-width: 30px; text-align: center;">
              ${val}
            </div>
          </div>
        `;
      }).join('');
      container.innerHTML = `<div style="display: flex; justify-content: center; gap: 10px;">${finalItems}</div>`;
      container.innerHTML += `<p style="color: lightgreen; font-size: 18px; margin-top: 10px;">Element found at index  ${mid}</p>`;
    } else if (array[mid] < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }, 500); // 500ms smooth animation
}
