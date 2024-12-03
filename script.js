document.getElementById("excel-file").addEventListener("change", handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        // Generate ID cards from JSON data
        generateIDCards(json);
    };
    reader.readAsBinaryString(file);
}

function generateIDCards(data) {
    const container = document.getElementById("id-cards-container");
    container.innerHTML = ""; // Clear any previous cards

    data.forEach(item => {
        const idCard = document.createElement("div");
        idCard.className = "id-card";

        // Create card elements
        const img = document.createElement("img");
        img.src = item.PhotoURL || 'default-photo.jpg'; // Optional photo field, use default if missing
        idCard.appendChild(img);

        const name = document.createElement("h3");
        name.innerText = item.Name;
        idCard.appendChild(name);

        const dob = document.createElement("p");
        dob.innerText = "DOB: " + item.DOB;
        idCard.appendChild(dob);

        const address = document.createElement("p");
        address.innerText = "Address: " + item.Address;
        idCard.appendChild(address);

        const idNumber = document.createElement("p");
        idNumber.innerText = "ID: " + item.IDNumber;
        idCard.appendChild(idNumber);

        container.appendChild(idCard);
    });
}

document.getElementById("generate-cards").addEventListener("click", function() {
    const fileInput = document.getElementById("excel-file");
    if (!fileInput.files.length) {
        alert("Please upload an Excel file first.");
    } else {
        fileInput.dispatchEvent(new Event('change')); // Trigger file processing
    }
});
