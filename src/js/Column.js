import DropZone from './DropZone'
import Item from './Item'
import KanbanBoardApi from './KanbanBoardApi'

export default class Column {
  constructor(id, title) {
    const topDropZone = DropZone.createDropZone()

    this.elements = {}
    this.elements.root = Column.createRoot()

    this.elements.title = this.elements.root.querySelector(
      '.board__column-title'
    )
    this.elements.items = this.elements.root.querySelector(
      '.board__column-items'
    )
    this.elements.addItem = this.elements.root.querySelector('.board__add-item')

    this.elements.root.querySelector('.board__column').dataset.id = id
    this.elements.title.textContent = title
    this.elements.items.appendChild(topDropZone)

    this.elements.addItem.addEventListener('click', () => {
      const newItem = KanbanBoardApi.insertItem(id, '')
      this.renderItem(newItem)
    })
    KanbanBoardApi.getItems(id).forEach((item) => {
      this.renderItem(item)
    })

    const onBlur = () => {
      const newContent = this.elements.title.textContent.trim()
      if (newContent == this.content) return
      this.content = newContent
      KanbanBoardApi.updateColumn(id, {
        content: this.content
      })
    }
    this.elements.title.addEventListener('blur', onBlur)
    this.elements.title.addEventListener('dblclick', () => {
      const check = confirm('Вы действительно хотите удалить колонку?')
      if (check) {
        KanbanBoardApi.deleteColumn(id)
        this.elements.title.removeEventListener('blur', onBlur)
        this.elements.root.parentElement.removeChild(this.elements.root)
      }
    })
  }

  static createRoot() {
    const range = document.createRange()
    range.selectNode(document.body)
    return range.createContextualFragment(`
        <div class="column">
          <div class="board__column">
            <div class="board__column-content">
                <div class="board__column-title" contenteditable></div>
              <div class="board__column-items"></div> 
          </div>
          </div>
          <button class="board__add-item" type="button">
              <span class="board__add-icon"></span>
              <span class="board__add-item--text">Добавить элемент</span>
          </button>
        </div>
        `).children[0]
  }
  renderItem(data) {
    const item = new Item(data.id, data.content)
    this.elements.items.appendChild(item.elements.root)
  }
}
