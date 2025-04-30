document.addEventListener('DOMContentLoaded', () => {
    const addRowBtn = document.getElementById('addRowBtn');
    const dataTable = document.getElementById('dataTable');

    const subjectInput = document.getElementById('subjectInput');
    const test1Input = document.getElementById('test1Input');
    const test2Input = document.getElementById('test2Input');
    const test3Input = document.getElementById('test3Input');
    const test4Input = document.getElementById('test4Input');

    addRowBtn.addEventListener('click', () => {
        const subject = subjectInput.value.trim();
        const test1 = test1Input.value.trim();
        const test2 = test2Input.value.trim();
        const test3 = test3Input.value.trim();
        const test4 = test4Input.value.trim();

        if (!subject) {
            alert('Please enter a subject.');
            return;
        }
        if ([test1, test2, test3, test4].some(score => score === '' || isNaN(score))) {
            alert('Please enter valid numeric scores for all tests.');
            return;
        }

        const newRow = document.createElement('tr');
        newRow.classList.add('new-row');

        [subject, test1, test2, test3, test4].forEach(cellData => {
            const newCell = document.createElement('td');
            newCell.textContent = cellData;
            newRow.appendChild(newCell);
        });

        dataTable.appendChild(newRow);

        subjectInput.value = '';
        test1Input.value = '';
        test2Input.value = '';
        test3Input.value = '';
        test4Input.value = '';

        setTimeout(() => {
            newRow.classList.remove('new-row');
        }, 2000);
    });
});
