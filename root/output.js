const courses = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] }, // от 500
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] }, // до 400
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] }, // от 200
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] }, // free
];

// const requiredRange1 = [null, 200]; // до 200
// const requiredRange2 = [100, 350];
// const requiredRange3 = [200, null]; // от 200

const container = document.querySelector('.container')
const filterForm = document.forms[0]
const table = createTable(courses)
container.append(table)

const sortButtons = Array.from(document.querySelectorAll('button.sort'))
const tableBodyRows = Array.from(table.tBodies[0].children)



function sortByName(e) {
  const name = e.target.dataset.name
  const sortOrder = Number(e.target.dataset.order)
  const sortedCourses = sorting(courses, name, sortOrder)

  e.target.dataset.order = sortOrder * -1

  const attrs = {}
  const sortedKeys = []

  sortedCourses.forEach(({ name, prices }, index) => {
    let [minPrice, maxPrice] = prices
    let courseTitle = name.split(' ').at(-1)
    let sortedKey = courseTitle

    const cellContent = {
      'title': courseTitle,
      'min-price': minPrice,
      'max-price': maxPrice,
    }

    const row = tableBodyRows[index]
    const cells = Array.from(row.children)
    const key = row.dataset.key

    attrs[key] = Array.from(row.attributes)
    sortedKeys.push(sortedKey)

    for (let attr in attrs[key]) {
      const { name, value } = attrs[key][attr]
      row.removeAttribute(name, value)
    }

    cells.forEach(cell => {
      cell.textContent = cellContent[cell.dataset.name]
    })
  })

  sortedKeys.forEach((key, index) => {
    const row = tableBodyRows[index]
    row.dataset.key = key

    for (const attr of attrs[key]) {
      row.setAttribute(attr.name, attr.value)
    }
  })
}

function filterByChange(e) {

  const input = e.target
  const inputValues = input.value.split(',')

  const filterValues = inputValues.map((value) => {
    return value === 'null' ? null : Number(value)
  })

  const filtredCourses = filter(courses, filterValues)

  const filtredTitles = filtredCourses.map(({ name }) => {
    return name.split(' ').at(-1)
  })

  tableBodyRows.forEach((row) => {
    const courseTitle = row.firstElementChild.textContent.trim()

    row.classList.remove('filtred', 'unfiltred')

    if (input.dataset.value === 'all') {
      return
    }

    if (filtredTitles.includes(courseTitle)) {
      row.classList.add('filtred')
    } else {
      row.classList.add('unfiltred')
    }

  })
}



filterForm.oninput = filterByChange
sortButtons.forEach(button => button.onclick = sortByName)






