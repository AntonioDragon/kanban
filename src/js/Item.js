import DropZone from './DropZone'
import KanbanBoardApi from './KanbanBoardApi'

export default class Item {
  constructor(id, content) {
    const bottomDropZone = DropZone.createDropZone()

    this.elements = {}
    this.elements.root = Item.createRoot()
    this.elements.input = this.elements.root.querySelector(
      '.board__item--input'
    )

    this.elements.root.dataset.id = id
    this.elements.input.textContent = content
    this.content = content
    this.elements.root.appendChild(bottomDropZone)

    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim()
      if (newContent == this.content) return
      this.content = newContent
      KanbanBoardApi.updateitem(id, {
        content: this.content
      })
    }
    this.elements.input.addEventListener('blur', onBlur)
    this.elements.root.addEventListener('dblclick', () => {
      const check = confirm('Вы действительно хотите удалить елемент?')
      if (check) {
        KanbanBoardApi.deleteItem(id)
        this.elements.input.removeEventListener('blur', onBlur)
        this.elements.root.parentElement.removeChild(this.elements.root)
      }
    })
    this.elements.root.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', id)
    })
    this.elements.input.addEventListener('drop', (e) => {
      e.preventDefault()
    })
  }
  static createRoot() {
    const range = document.createRange()
    range.selectNode(document.body)
    return range.createContextualFragment(`
            <div class="board__item" draggable="true">
                <div 
                    class="board__item--input" 
                    contenteditable 
                    data-placeholder="Для ввода или изменения нажмите на элемент"
                >
                </div>
            </div>
        `).children[0]
  }
}
