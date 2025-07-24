const submitData = () => {
    
    // built an empty array to store the results
    let tasks = []

    // access to each element of the input form
    let tasksDOM = document.querySelector('input[name=task]')
    console.log(tasksDOM.value)

}

const showData = () => {
    const tableDOM = document.querySelector("table tbody")

    // the problem here is that we could keep only one record

    // so we need to append the HTML string to the new variable. then render it with onload
    let htmlTable = `<tr>`
    htmlTable += `<td>input1</td>
    <td>input2</td>
    <td>input3</td>`
    htmlTable += `</tr>`

    tableDOM.innerHTML = htmlTable
}