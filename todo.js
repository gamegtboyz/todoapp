const submitData = () => {

    // access to each element of the input form
    let submittedTime = new Date()
    let tasksDOM = document.querySelector('input[name=task]')
    let dateDOM = document.querySelector('input[name=duedate]')
    let priorityDOM = document.querySelector('select[name=priority]')

    // store the new data record
    let userInput = {
        submittedtime: submittedTime,
        tasks: tasksDOM.value,
        duedate: dateDOM.value,
        priority: priorityDOM.value
    }

    // print out to console
    console.log(userInput)
    try {
        // recall the existing storage in localStorage
        let storage = JSON.parse(localStorage.getItem("userData"))

        // If storage is not an array (e.g., null or corrupted data), initialize it as an empty array
        if (!Array.isArray(storage)) {
            storage = [];
        }
        
        // add the new item
        storage.push(userInput)

        // store the called array back to the localStorage
        localStorage.setItem("userData", JSON.stringify(storage, null, 2))

        // show data on the table
        const tableDOM = document.querySelector("table tbody")
        let local_storage = JSON.parse(localStorage.getItem("userData"))

        let htmlTable = ''
        for (let i=0; i < local_storage.length; i++) {
            htmlTable += `<tr>
            <td>${local_storage[i].submittedtime}</td>
            <td>${local_storage[i].tasks}</td>
            <td>${local_storage[i].duedate}</td>
            <td>${local_storage[i].priority}</td>
            </tr>`
        }
        
        tableDOM.innerHTML = htmlTable


    } catch (error) {
        console.error(error)
    }
    

}

const exportData = () => {
    let storage = localStorage.getItem("userData")
    const blob = new Blob([storage], {type : "application/json"})
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href= url
    a.download = "data.json"
    a.click()

    URL.revokeObjectURL(url)
}

const storageCall = () => {
    const data = JSON.parse(localStorage.getItem("userData"))
    console.log(data)
}

const showData = () => {
    const tableDOM = document.querySelector("table tbody")
    let storage = JSON.parse(localStorage.getItem("userData"))

    let htmlTable = ''
    for (let i=0; i < storage.length; i++) {
        htmlTable += `<tr>
        <td>${storage[i].submittedtime}</td>
        <td>${storage[i].tasks}</td>
        <td>${storage[i].duedate}</td>
        <td>${storage[i].priority}</td>
        </tr>`
    }
    
    tableDOM.innerHTML = htmlTable
}

// wipe out the storage value
const clearData = () => {
    localStorage.setItem("userData", null)

    const tableDOM = document.querySelector("table tbody")
    tableDOM.innerHTML = ''
}