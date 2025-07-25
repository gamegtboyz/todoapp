function writeHTML(data) {
    
    const tableDOM = document.querySelector("table tbody")

    let htmlTable = ''
        try {
        for (let i=0; i < data.length; i++) {
            htmlTable += `<tr>
            <td>${data[i].timestamp}</td>
            <td>${data[i].tasks}</td>
            <td>${data[i].duedate}</td>
            <td>${data[i].priority}</td>
            <td><input name="complete" type="checkbox" value="${data[i].timestamp}"></td>
            </tr>`
        }
        
        tableDOM.innerHTML = htmlTable
    } catch(error) {
        console.log(error)
    }
}

function sortData(data) {
    
    const priorityOrder = {
        high: 3,
        moderate: 2,
        low: 1
    }
    
    data.sort((a,b) => {
            const dateA = new Date(a.duedate)
            const dateB = new Date(b.duedate)

            if (dateA < dateB) return -1
            if (dateA > dateB) return 1

            // sort the priority
            return priorityOrder[b.priority] - priorityOrder[a.priority]
        })
}

window.onload = async() => {
    let data = JSON.parse(localStorage.getItem("userData"))
    await sortData(data)
    await writeHTML(data)
}

const submitData = () => {

    // access to each element of the input form
    let submittedTime = new Date()
    let tasksDOM = document.querySelector('input[name=task]')
    let dateDOM = document.querySelector('input[name=duedate]')
    let priorityDOM = document.querySelector('select[name=priority]')

    // store the new data record
    let userInput = {
        timestamp: submittedTime,
        tasks: tasksDOM.value,
        duedate: dateDOM.value,
        priority: priorityDOM.value,
        completion: false
    }

    // print out to console and sort the data
    console.log(userInput)
    try {
        // recall the existing storage in localStorage
        let data = JSON.parse(localStorage.getItem("userData"))

        // If storage is not an array (e.g., null or corrupted data), initialize it as an empty array
        if (!Array.isArray(data)) {
            data = [];
        }
        
        // add the new item
        data.push(userInput)        

        // save the new array to the localStorage
        localStorage.setItem("userData", JSON.stringify(data, null, 2))
        
        // sort the data
        sortData(data)

        // show data on the table
        writeHTML(data)
        
        // refresh the page
        location.reload()

    } catch (error) {
        console.error(error)
    }   
}

const removeCompletedTasks = () => {

    let data = JSON.parse((localStorage.getItem("userData")))
    
    // Get all checkboxes with name 'complete'
    const checkboxes = document.querySelectorAll('input[name="complete"]:checked')
    const checkedTimestamps = Array.from(checkboxes).map(cb => cb.value)
    checkboxes.forEach(cb => cb.closest('tr').remove())
    data = data.filter(datum => !checkedTimestamps.includes(datum.timestamp))
    
    sortData(data)
    writeHTML(data)
    
    // save the updated array back to the localStorage
    localStorage.setItem("userData", JSON.stringify(data, null, 2))

}

const exportData = () => {
    let data = localStorage.getItem("userData")
    const blob = new Blob([data], {type : "application/json"})
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href= url
    a.download = "data.json"
    a.click()

    URL.revokeObjectURL(url)
}

const importData = () => {
    const fileInput = document.getElementById("jsonFileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a JSON file first.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
      try {
        const data = JSON.parse(event.target.result);

        // Optional: Validate structure
        if (!Array.isArray(data)) {
          alert("Invalid format: expected an array of tasks.");
          return;
        }

        const isValid = data.every(item =>
          "timestamp" in item &&
          "tasks" in item &&
          "duedate" in item &&
          "priority" in item &&
          "completion" in item
        );

        if (!isValid) {
          alert("Invalid file structure. Some task items are missing required fields.");
          return;
        }

        // Save to localStorage as "userData"
        localStorage.setItem("userData", JSON.stringify(data));
        alert("userData successfully imported into localStorage!");
        location.reload(); // optional: reload to reflect changes
      } catch (e) {
        alert("Error reading or parsing the JSON file.");
        console.error(e);
      }
    };

    reader.readAsText(file);
}

// wipe out the storage value
const clearAllData = () => {
    localStorage.setItem("userData", null)

    const tableDOM = document.querySelector("table tbody")
    tableDOM.innerHTML = ''
}