function toggleCategory(id) {
    const content = document.getElementById(id);
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
    } else {
        content.classList.add('expanded');
    }
}