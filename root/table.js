function createTable(arr) {
  const table = document.createElement('table')

  const courses = arr.reduce((output, { name, prices }) => {

    const title = name.split(' ').at(-1)
    let [minPrice, maxPrice] = prices

    let tdTitle = `
      <td class='title' data-name='title'>
        ${title}
      </td>`

    let tdMinPrice = `
      <td data-name='min-price'>
        ${minPrice ?? ''}
      </td>`

    let tdMaxPrice = `
      <td data-name='max-price'>
       ${maxPrice ?? ''}
      </td>`

    output += `
      <tr data-key='${title}'>
        ${tdTitle}
        ${tdMinPrice}
        ${tdMaxPrice}
      </tr>`

    return output
  }, ``)

  table.innerHTML = `
    <thead>
      <tr>
        <th>Языковые курсы</th>
        <th>
          <button class="sort" data-name="min" data-order="1">от</button>
        </th>
        <th>
          <button class="sort" data-name="max" data-order="1">до</button>
        </th>
      </tr>
   </thead>
    <tbody>
       ${courses}
   </tbody>
  `

  return table
}
