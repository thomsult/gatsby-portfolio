import React from 'react'

export default function useOffsetOfElement(element: HTMLElement)  {
    if(!element) return {top: 0, left: 0}
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
