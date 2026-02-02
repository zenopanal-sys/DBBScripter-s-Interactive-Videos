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

// Use localStorage for demo persistence
let videos = JSON.parse(localStorage.getItem('videos')) || {
    chfh: [],
    pmvhmv: [],
    challenges: [],
    misc: []
};

if(document.getElementById('uploadForm')){
document.getElementById('uploadForm').onsubmit = function(e) {
    e.preventDefault();
    let cat = this.category.value;
    let videoFile = this.video.files[0];
    let funscriptFile = this.funscript.files[0];

    // Store files as object URLs (for demo only)
    videos[cat].push({
        videoName: videoFile.name,
        funscriptName: funscriptFile.name,
        videoURL: URL.createObjectURL(videoFile),
        funscriptURL: URL.createObjectURL(funscriptFile)
    });
    localStorage.setItem('videos', JSON.stringify(videos));
    alert("Uploaded!");
    this.reset();
};
}

function showCategory(cat) {
    let listDiv = document.getElementById('video-list');
    let items = videos[cat];
    let html = "";
    if (!items || !items.length) {
        html += "<p>No videos yet.</p>";
    } else {
        items.forEach((item, idx) => {
            html += `<div class="video-item">
                        <strong>${item.videoName}</strong><br>
                        <a href="video.html?cat=${cat}&idx=${idx}"><button>Watch Video</button></a>
                        <a href="${item.funscriptURL}" download>Download FunScript</a>
                    </div>`;
        });
    }
    listDiv.innerHTML = html;
}

function connectDevice() {
    let code = document.getElementById('device-code').value.trim();
    let status = document.getElementById('device-status');
    if(code.length > 0){
        status.textContent = "Device connected!";
    } else {
        status.textContent = "Please enter a valid code.";
    }
}

function createRoom() {
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