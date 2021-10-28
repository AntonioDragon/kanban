import KanbanBoard from './KanbanBoardApi'

export default class DropZone {
  static createDropZone() {
    const range = document.createRange()
    range.selectNode(document.body)
    const dropZone = range.createContextualFragment(`
            <div class="board__dropzone"></div>
        `).children[0]
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault()
      dropZone.classList.add('board__dropzone--active')
    })
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('board__dropzone--active')
    })
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault()
      dropZone.classList.remove('board__dropzone--active')
       const columnElements = dropZone.closest('.board__column')
      const columnId = Number(columnElements.dataset.id)
      const dropZonesInColumn = Array.from(
        columnElements.querySelectorAll('.board__dropzone')
      )
      const droppedIndex = dropZonesInColumn.indexOf(dropZone)
      const itemId = Number(e.dataTransfer.getData('text/plain'))
      const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`)
      const insertAfter = dropZone.parentElement.classList.contains(
        'board__item'
      )
        ? dropZone.parentElement
        : dropZone
      if (droppedItemElement.contains(dropZone)) {
        return
      }

      insertAfter.after(droppedItemElement)
      KanbanBoard.updateitem(itemId, {
        columnId,
        position: droppedIndex
      })
    })

    return dropZone
  }
}
