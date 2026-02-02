// Simple admin login (for demo only, not secure for production!)
const ADMIN_PASSWORD = "wikxam-zuZmyw-cefcu1";

function checkAdmin() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === ADMIN_PASSWORD) {
        document.getElementById('admin-upload').style.display = 'block';
        document.getElementById('admin-login').style.display = 'none';
    } else {
        alert("Incorrect password!");
    }
}

// Simulated storage for uploaded videos (replace with real backend/database)
let videos = {
    chfh: [],
    pmvhmv: [],
    challenges: [],
    misc: []
};

// Handle upload form
document.getElementById('uploadForm').onsubmit = function(e) {
    e.preventDefault();
    let cat = this.category.value;
    let videoFile = this.video.files[0];
    let funscriptFile = this.funscript.files[0];

    // For demo, just store names (in production, upload to server)
    videos[cat].push({
        videoName: videoFile.name,
        funscriptName: funscriptFile.name,
        videoURL: URL.createObjectURL(videoFile),
        funscriptURL: URL.createObjectURL(funscriptFile)
    });
    alert("Uploaded!");
    showCategory(cat);
    this.reset();
};

// Show videos in selected category
function showCategory(cat) {
    let listDiv = document.getElementById('video-list');
    let items = videos[cat];
    let html = `<h2>${cat.toUpperCase()}</h2>`;
    if (!items.length) {
        html += "<p>No videos yet.</p>";
    } else {
        html += "<ul>";
        items.forEach((item, idx) => {
            html += `<li>
                <strong>${item.videoName}</strong>
                <video width="320" controls src="${item.videoURL}"></video><br>
                <a href="${item.funscriptURL}" download>Download FunScript</a>
            </li>`;
        });
        html += "</ul>";
    }
    listDiv.innerHTML = html;
}

// Device connection simulation
function connectDevice() {
    let code = document.getElementById('device-code').value.trim();
    let status = document.getElementById('device-status');
    if(code.length > 0){
        status.textContent = "Device connected!";
    } else {
        status.textContent = "Please enter a valid code.";
    }
}

// Multiplayer mode (front-end simulation)
function createRoom() {
    // Generate a simple random room ID
    let roomId = Math.random().toString(36).substr(2, 8);
    let link = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    document.getElementById('room-link').value = link;
    document.getElementById('room-status').textContent = "Room created! Share the link.";
}

function joinRoom() {
    let roomId = document.getElementById('join-room-id').value.trim();
    if(roomId.length > 0){
        document.getElementById('room-status').textContent = "Joined room: " + roomId;
    } else {
        document.getElementById('room-status').textContent = "Please enter a valid room code.";
    }
}