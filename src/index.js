require('./scss/style.scss')
import Kanban from './js/Kanban'


new Kanban(document.querySelector('.board'))


let tooltipElem;
document.querySelector('.info-icon').addEventListener('mouseover', (event)=>{
    let tooltipHtml = event.target.dataset.tooltip;
    if (!tooltipHtml) return;
    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);
    let coords = event.target.getBoundingClientRect();
    let left = coords.left + (event.target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0; 
    let top = coords.top + event.target.offsetHeight + 5;
    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
    
})
document.querySelector('.info-icon').addEventListener('mouseout', ()=>{
    if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
})