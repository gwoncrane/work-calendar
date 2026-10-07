const pattern = ["주간", "주간", "야간", "야간", "휴무", "휴무"];
const baseDateStr = "2026-10-01"; 

let currentDate = new Date(2026, 9, 1);

function getShift(targetDate, baseDate) {
    const d1 = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    const d2 = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    const diffTime = d2 - d1;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let index = (diffDays % 6);
    if (index < 0) index += 6;
    
    return pattern[index];
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById("month-title").textContent = `${year}년 ${month + 1}월`;
    
    const grid = document.getElementById("calendar-grid");
    grid.innerHTML = "";
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    const baseDate = new Date(baseDateStr);
    const today = new Date();

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        grid.appendChild(emptyCell);
    }
    
    for (let day = 1; day <= lastDay; day++) {
        const cell = document.createElement("div");
        cell.className = "day-cell";
        
        const thisDate = new Date(year, month, day);
        const shift = getShift(thisDate, baseDate);
        
        if (
            thisDate.getFullYear() === today.getFullYear() &&
            thisDate.getMonth() === today.getMonth() &&
            thisDate.getDate() === today.getDate()
        ) {
            cell.classList.add("today");
        }
        
        cell.innerHTML = `
            <span class="date-num">${day}</span>
            <span class="badge ${shift}">${shift}</span>
        `;
        
        grid.appendChild(cell);
    }
    
    updateTodayStatus(baseDate);
}

function updateTodayStatus(baseDate) {
    const today = new Date();
    const todayShift = getShift(today, baseDate);
    const statusBox = document.getElementById("today-status");
    
    statusBox.textContent = `오늘 (${today.getMonth()+1}/${today.getDate()}) 근무는 ⭐${todayShift}⭐ 입니다!`;
}

document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
