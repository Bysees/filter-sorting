function filter(courses, filterRangePrices) {

  const [minFilter, maxFilter] = filterRangePrices

  const hasMinFilter = minFilter !== null
  const hasMaxFilter = maxFilter !== null

  const range = {
    from: hasMinFilter && !hasMaxFilter,
    to: !hasMinFilter && hasMaxFilter,
    beetwen: hasMinFilter && hasMaxFilter
  }

  const filtredArray = courses.filter(({ prices }) => {
    const [minPrice, maxPrice] = prices

    const hasMinPrice = minPrice !== null
    const hasMaxPrice = maxPrice !== null

    if (range.from) { //? От какой-то суммы (от 200)

      //! Если есть мин. цена курса, сравниваем цену фильтра с ней,
      //! Если мин. цена курса отсутсвует, то сравниваем цену фильтра с макс. ценой курса
      return hasMinPrice
        ? minPrice >= minFilter
        : maxPrice >= minFilter
    }


    if (range.to) { //? До какой-то суммы (до 200)

      //! Если есть макс. цена курса, сравниваем цену фильтра с ней,
      //! Если макс. цена курса отсутсвует, то сравниваем цену фильтра с мин. ценой курса
      return hasMaxPrice
        ? maxPrice <= maxFilter
        : minPrice <= maxFilter
    }

    if (range.beetwen) {  //? Между суммами (от 100 до 350)

      //! Если отсутствует мин. цена курса,
      //! то проверяем входит ли в диапазон фильтров макс. цена курса
      if (!hasMinPrice && hasMaxPrice) {
        return maxPrice >= minFilter && maxPrice <= minFilter
      }

      //! Если отсутствует макс. цена курса,
      //! то проверяем входит ли в диапазон фильтров мин. цена курса
      if (!hasMaxPrice && hasMinPrice) {
        return minPrice >= minFilter && minPrice <= maxFilter
      }

      //! Если есть и макс. и мин. цена курса,
      //! то проверяем входят ли обе эти цены внутрь диапазона цен фильтра
      return minPrice >= minFilter && maxPrice <= maxFilter
    }

  })

  return filtredArray
}