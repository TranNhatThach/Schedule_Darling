// api.js
const API_URL = "https://ten-app.onrender.com/api/schedule"; // đổi URL khi deploy

async function loadSchedule() {
    try {
        const res = await fetch(API_URL);
        scheduleData = await res.json();
        renderScheduleFromData();
    } catch (e) {
        console.error("Không tải được dữ liệu từ server:", e);
    }
}

async function saveSchedule() {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scheduleData)
        });
        console.log("Đã lưu lên server!");
    } catch (e) {
        console.error("Không lưu được:", e);
    }
}

// Hàm vẽ lại giao diện từ dữ liệu tải về
function renderScheduleFromData() {
    for (const [key, data] of Object.entries(scheduleData)) {
        const [period, day] = key.split("-");
        const cell = [...document.querySelectorAll(".schedule-cell")]
            .find(c => c.getAttribute("onclick")?.includes(period) && c.getAttribute("onclick")?.includes(day));
        if (cell) {
            cell.innerHTML = `
                <div class="p-2">
                    <div class="font-semibold text-sm text-gray-800">${data.subject}</div>
                    ${data.teacher ? `<div class="text-xs text-gray-600 line-clamp-2">${data.teacher.substring(0, 100)}${data.teacher.length > 100 ? '...' : ''}</div>` : ''}
                    ${data.room ? `<div class="text-xs text-gray-500">📍 ${data.room}</div>` : ''}
                </div>
            `;
            cell.classList.add('bg-blue-100');
        }
    }
}

// Khi DOM sẵn sàng thì tải dữ liệu từ backend
document.addEventListener("DOMContentLoaded", loadSchedule);
