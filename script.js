const form = document.getElementById("activityForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const activityList = document.getElementById("activityList");
const activityCount = document.getElementById("activityCount");

let activities = JSON.parse(
    localStorage.getItem("activities") || "[]"
);

function saveActivities() {
    localStorage.setItem(
        "activities",
        JSON.stringify(activities)
    );
}

function renderActivities() {

    activityList.innerHTML = "";

    activityCount.textContent =
        `${activities.length} รายการ`;

    if (activities.length === 0) {

        activityList.innerHTML = `
            <div class="empty">
                ยังไม่มีกิจกรรม
            </div>
        `;

        return;
    }

    activities.forEach((activity, index) => {

        const item = document.createElement("div");

        item.className = "activity";

        item.innerHTML = `
            <h3>${escapeHtml(activity.title)}</h3>

            <p>
                ${escapeHtml(activity.description)}
            </p>

            <button
                class="delete"
                onclick="deleteActivity(${index})"
            >
                ลบกิจกรรม
            </button>
        `;

        activityList.appendChild(item);

    });
}

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

function deleteActivity(index) {

    activities.splice(index, 1);

    saveActivities();

    renderActivities();

}

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
        return;
    }

    activities.push({
        title,
        description,
        createdAt: new Date().toISOString()
    });

    saveActivities();

    renderActivities();

    form.reset();

});

renderActivities();