import Column from './Column'
import KanbanBoardApi from './KanbanBoardApi'

export default class Kanban {
  constructor(root) {
    this.root = root
    const child = KanbanBoardApi.checkColumn()
    child.forEach((column) => {
      const columnView = new Column(column.id, column.title)
      this.root.appendChild(columnView.elements.root)
      child.push(columnView)
    })
    const blockAddColumn = Kanban.createBlockAddColumn()
    this.root.appendChild(blockAddColumn)
    this.addColumn = this.root.querySelector('.add-column').children[0]
    const createNewColumn = () => {
      const child = KanbanBoardApi.checkColumn()
      this.root.removeChild(this.root.querySelector('.add-column'))
      KanbanBoardApi.addColumn(child.length + 1, 'New')
      const columnView = new Column(child.length + 1, 'New column')
      this.root.appendChild(columnView.elements.root)
      this.root
        .appendChild(Kanban.createBlockAddColumn())
        .addEventListener('click', createNewColumn)
    }

    this.addColumn.addEventListener('click', createNewColumn)
  }
  static deleteColumn(index) {
    this.root.removeChild(this.child[index].elements.root)
    KanbanBoardApi.deleteColumn(index)
    this.child.splice(index, 1)
  }
  static createBlockAddColumn() {
    const range = document.createRange()
    range.selectNode(document.body)
    return range.createContextualFragment(`
              <div class="board__column add-column">
                <button class="board__add-item" type="button">
                  <span class="board__add-icon"></span>
                  <span class="board__add-item--text">Добавить Колонку</span>
                </button>
              </div>
            `).children[0]
  }
}
