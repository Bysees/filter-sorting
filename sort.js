const sorting = (courses, name, order = 1) => {

  const column = name === 'min' ? 0 : 1

  return courses.slice().sort((prevCourse, nextCourse) => {
    let a = prevCourse.prices[column]
    let b = nextCourse.prices[column]


    //? В случае если a || b = null, чтобы 0 считался больше чем null
    a = a === 0 ? 1 : a
    b = b === 0 ? 1 : b

    return (b - a) * order
  })

}