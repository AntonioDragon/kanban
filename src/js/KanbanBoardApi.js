export default class KanbanBoardApi {
  static getItems(columnId) {
    const column = read().find((column) => column.id == columnId)

    if (!column) return []

    return column.items
  }
  static insertItem(columnId, content) {
    const data = read()
    const column = data.find((column) => column.id == columnId)
    const item = {
      id: Math.floor(Math.random() * 1000000),
      content
    }
    if (!column) {
      throw new Error('Column does not exist.')
    }
    column.items.push(item)
    save(data)

    return item
  }
  static updateitem(itemId, newProps) {
    const data = read()
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id == itemId)
        if (item) {
          return [item, column]
        }
      }
    })()
    if (!item) throw new Error('Item not Found')
    item.content =
      newProps.content === undefined ? item.content : newProps.content
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      
      const targetColumn = data.find((column) => column.id == newProps.columnId)
      
      if (!targetColumn) throw new Error('Target column not found')
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1)
      targetColumn.items.splice(newProps.position, 0, item)
    }
    save(data)
  }
  static updateColumn(columnId, newProps) {
    const data = read()
    let title = newProps.content === undefined ? title : newProps.content
    data[columnId - 1].title = title
    save(data)
  }
  static addColumn(columnId, title) {
    const data = read()
    data.push({id: columnId, title, items: []})
    save(data)
  }
  static deleteColumn(columnId) {
    const data = read()
    const column = data.find((column) => column.id == columnId)
    if (column) data.splice(data.indexOf(column), 1)
    save(data)
  }
  static deleteItem(itemId) {
    const data = read()
    for (const column of data) {
      const item = column.items.find((item) => item.id == itemId)
      if (item) column.items.splice(column.items.indexOf(item), 1)
    }
    save(data)
  }
  static checkColumn() {
    return read()
  }
}

const read = () => {
  const json = localStorage.getItem('kanban-data')

  if (!json) {
    return [
      {
        id: 1,
        title: 'Запланировано',
        items: []
      },
      {
        id: 2,
        title: 'Начато',
        items: []
      },
      {
        id: 3,
        title: 'Закончено',
        items: []
      }
    ]
  }
  return JSON.parse(json)
}

const save = (data) => {
  localStorage.setItem('kanban-data', JSON.stringify(data))
}
