document.addEventListener("DOMContentLoaded", () => {
    const actorNameInput = document.getElementById("actorName");
    const searchButton = document.getElementById("searchActor");
    const deleteButton = document.getElementById("deleteActor");
    const outputMessage = document.getElementById("outputMessage");
    const timeBox = document.getElementById("timeElapsed");
    const actorTable = document.getElementById("actorTable");
    const actorTableBody = actorTable.querySelector("tbody");

    const baseURL = window.location.origin;

    const showElapsedTime = (time) => {
        timeBox.textContent = `Tiempo de procesamiento: ${time} ms`;
    };

    const showActorData = (data) => {
        actorTableBody.innerHTML = ""; 
        actorTable.classList.remove("hidden");

        for (const [key, value] of Object.entries(data)) {
            const row = document.createElement("tr");
            const cellKey = document.createElement("td");
            const cellValue = document.createElement("td");

            cellKey.textContent = key;
            cellValue.textContent = value || "N/A";

            row.appendChild(cellKey);
            row.appendChild(cellValue);
            actorTableBody.appendChild(row);
        }
    };


    const showMessage = (message) => {
        actorTable.classList.add("hidden");
        outputMessage.textContent = message;
    };


    searchButton.addEventListener("click", async () => {
        const actorName = actorNameInput.value.trim();
        if (!actorName) {
            showMessage("Por favor, ingrese el nombre de un actor.");
            return;
        }

        try {
            const start = performance.now(); 
            const response = await fetch(`${baseURL}/actors/${actorName}`);
            const end = performance.now(); 
            const elapsed = (end - start).toFixed(2);

            showElapsedTime(elapsed);

            if (response.ok) {
                const data = await response.json();
                showActorData(data);
                outputMessage.textContent = "";
            } else {
                showMessage(`Error: ${response.statusText}`);
            }
        } catch (error) {
            showMessage(`Error: ${error.message}`);
        }
    });

    deleteButton.addEventListener("click", async () => {
        const actorName = actorNameInput.value.trim();
        if (!actorName) {
            showMessage("Por favor, ingrese el nombre de un actor.");
            return;
        }

        try {
            const start = performance.now();
            const response = await fetch(`${baseURL}/actors/${actorName}`, { method: "DELETE" });
            const end = performance.now(); 
            const elapsed = (end - start).toFixed(2);

            showElapsedTime(elapsed);

            if (response.ok) {
                const data = await response.json();
                showMessage(data.message);
            } else {
                showMessage(`Error: ${response.statusText}`);
            }
        } catch (error) {
            showMessage(`Error: ${error.message}`);
        }
    });
});
