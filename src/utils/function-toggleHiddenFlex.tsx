export const toggleHiddenFlex = (element: HTMLElement) => {
    if (element.classList.contains('hidden')) {
        element.classList.replace('hidden', 'flex');
    } else if (element.classList.contains('flex')) {
        element.classList.replace('flex', 'hidden');
    }
};