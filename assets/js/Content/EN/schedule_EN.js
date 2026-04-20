(function () {
  const mount = document.getElementById('mount-schedule') || document.body;

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        node.className = value;
      } else if (key === 'text') {
        node.textContent = value;
      } else if (key === 'html') {
        node.innerHTML = value;
      } else if (key.startsWith('data-')) {
        node.setAttribute(key, value);
      } else if (value !== null && value !== undefined) {
        node.setAttribute(key, value);
      }
    });
    children.forEach(child => {
      if (child !== null && child !== undefined) node.appendChild(child);
    });
    return node;
  };

  const createSemesterTable = (semesterId, title) => {
    const container = el('div', { className: 'semester-timetable-container', id: semesterId });
    if (semesterId === 'freshman-first') container.classList.add('active');

    container.appendChild(el('h3', { className: 'semester-title', text: title }));

    const timetableContainer = el('div', { className: 'timetable-container' });
    const table = el('table', { className: 'timetable', id: `${semesterId}-timetable` });
    const thead = el('thead');
    const headRow = el('tr');
    ['Period', 'Period Number', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(text => {
      headRow.appendChild(el('th', { text }));
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    table.appendChild(el('tbody'));
    timetableContainer.appendChild(table);
    container.appendChild(timetableContainer);

    const classesContainer = el('div', { className: 'my-classes-container' });
    classesContainer.appendChild(el('h3', { text: 'My Classes' }));
    const classesTable = el('table', { className: 'my-classes-table' });
    const classesHead = el('thead');
    const classesHeadRow = el('tr');
    ['Course Number', 'Course Name', 'Instructor', 'Time', 'Credits'].forEach(text => {
      classesHeadRow.appendChild(el('th', { text }));
    });
    classesHead.appendChild(classesHeadRow);
    classesTable.appendChild(classesHead);
    classesTable.appendChild(el('tbody'));
    classesContainer.appendChild(classesTable);
    container.appendChild(classesContainer);

    return container;
  };

  const createUstcTimetable = () => {
    const table = el('table', { className: 'timetable', id: 'ustc-timetable' });
    const tbody = el('tbody');

    for (let period = 1; period <= 13; period += 1) {
      const row = el('tr');
      row.appendChild(el('td', { className: 'period-number', text: String(period) }));
      for (let day = 0; day < 7; day += 1) {
        row.appendChild(el('td', {
          'data-period': String(period),
          'data-day': String(day)
        }));
      }
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    return table;
  };

  const createWeeksGrid = () => {
    const grid = el('div', { id: 'weeks-grid' });
    for (let week = 1; week <= 18; week += 1) {
      const wrap = el('div', { className: 'week-checkbox' });
      const checkbox = el('input', {
        type: 'checkbox',
        id: `week-${week}`,
        name: 'ustc-week',
        value: String(week)
      });
      const label = el('label', { for: `week-${week}`, text: String(week) });
      wrap.appendChild(checkbox);
      wrap.appendChild(label);
      grid.appendChild(wrap);
    }
    return grid;
  };

  const createDayChecks = () => {
    const days = el('div', { className: 'days-container' });
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((day, index) => {
      const label = el('label');
      const checkbox = el('input', {
        type: 'checkbox',
        name: 'ustc-day',
        value: String(index)
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${day}`));
      days.appendChild(label);
    });
    return days;
  };

  const createModal = (id, titleId, formId, titleText, closeId, cancelId, deleteId, bodyBuilder) => {
    const modal = el('div', { id, className: 'modal' });
    const content = el('div', { className: 'modal-content' });
    content.appendChild(el('button', { id: closeId, className: 'modal-close', type: 'button', text: '×' }));
    content.appendChild(el('h3', { id: titleId, text: titleText }));
    const form = el('form', { id: formId });
    bodyBuilder(form);
    const actions = el('div', { className: 'modal-actions' });
    actions.appendChild(el('button', { type: 'submit', className: 'event-form-btn-save', text: 'Save' }));
    actions.appendChild(el('button', { id: cancelId, type: 'button', className: 'event-form-btn-cancel', text: 'Cancel' }));
    actions.appendChild(el('button', { id: deleteId, type: 'button', className: 'event-form-btn-delete', text: 'Delete' }));
    form.appendChild(actions);
    content.appendChild(form);
    modal.appendChild(content);
    return modal;
  };

  const schedule = el('div', { id: 'schedule' });

  schedule.appendChild(el('button', {
    id: 'toggle-btn-schedule',
    type: 'button',
    html: '<span><i class="fas fa-sun"></i></span>'
  }));

  schedule.appendChild(el('div', { id: 'clock-schedule', text: 'GMT+8 00:00' }));

  const container = el('div', { className: 'container' });
  container.appendChild(el('div', { className: 'schedule-heading', text: 'My Schedule' }));

  const scheduleContainer = el('div', { className: 'schedule-container' });
  const switcher = el('div', { className: 'schedule-switcher' });
  [
    ['my-timetable', 'My Timetable', true],
    ['ustc-timetable', 'USTC Timetable', false],
    ['timetable', 'Timetable', false],
    ['calendar', 'Calendar', false]
  ].forEach(([view, text, active]) => {
    switcher.appendChild(el('button', {
      className: active ? 'schedule-switch-btn active' : 'schedule-switch-btn',
      'data-view': view,
      type: 'button',
      text
    }));
  });
  scheduleContainer.appendChild(switcher);

  const myTimetableSection = el('div', { className: 'schedule-section active', id: 'my-timetable-section' });
  const semesterSelector = el('div', { className: 'semester-selector' });
  const semesterDropdown = el('div', { className: 'semester-dropdown' });
  semesterDropdown.appendChild(el('button', { className: 'semester-dropdown-btn', type: 'button', html: 'Select Semester <i class="fas fa-caret-down"></i>' }));
  const dropdownContent = el('div', { className: 'semester-dropdown-content' });
  [
    ['freshman-first', 'Freshman Year - First Semester'],
    ['freshman-second', 'Freshman Year - Second Semester'],
    ['sophomore-first', 'Sophomore Year - First Semester'],
    ['sophomore-second', 'Sophomore Year - Second Semester'],
    ['junior-first', 'Junior Year - First Semester'],
    ['junior-second', 'Junior Year - Second Semester'],
    ['senior-first', 'Senior Year - First Semester'],
    ['senior-second', 'Senior Year - Second Semester']
  ].forEach(([id, text]) => {
    dropdownContent.appendChild(el('a', { href: '#', 'data-semester': id, text }));
  });
  semesterDropdown.appendChild(dropdownContent);
  semesterSelector.appendChild(semesterDropdown);
  myTimetableSection.appendChild(semesterSelector);

  [
    ['freshman-first', 'Freshman Year - First Semester'],
    ['freshman-second', 'Freshman Year - Second Semester'],
    ['sophomore-first', 'Sophomore Year - First Semester'],
    ['sophomore-second', 'Sophomore Year - Second Semester'],
    ['junior-first', 'Junior Year - First Semester'],
    ['junior-second', 'Junior Year - Second Semester'],
    ['senior-first', 'Senior Year - First Semester'],
    ['senior-second', 'Senior Year - Second Semester']
  ].forEach(([id, title]) => {
    myTimetableSection.appendChild(createSemesterTable(id, title));
  });

  const ustcSection = el('div', { className: 'schedule-section', id: 'ustc-timetable-section' });
  ustcSection.appendChild(el('div', { className: 'schedule-actions' }, [
    el('button', { id: 'add-ustc-event', type: 'button', text: 'Add Class' })
  ]));
  ustcSection.appendChild(createUstcTimetable());
  const ustcListWrap = el('div', { className: 'ustc-classes-container' });
  ustcListWrap.appendChild(el('table', { className: 'ustc-classes-table' }, [
    el('thead', {}, [el('tr', {}, [
      el('th', { text: 'Period' }),
      el('th', { text: 'Course Name' }),
      el('th', { text: 'Instructor' }),
      el('th', { text: 'Location' }),
      el('th', { text: 'Weeks' }),
      el('th', { text: 'Days' }),
      el('th', { text: 'Credits' }),
      el('th', { text: 'Actions' })
    ])]),
    el('tbody', { id: 'ustc-classes-body' })
  ]));
  ustcSection.appendChild(ustcListWrap);

  const timetableSection = el('div', { className: 'schedule-section', id: 'timetable-section' });
  timetableSection.appendChild(el('div', { className: 'schedule-actions' }, [
    el('button', { id: 'add-timetable-event', type: 'button', text: 'Add Event' }),
    el('button', { id: 'prev-week-btn', type: 'button', text: 'Prev Week' }),
    el('span', { id: 'current-week', text: 'Week' }),
    el('button', { id: 'next-week-btn', type: 'button', text: 'Next Week' })
  ]));
  const timetableTable = el('table', { className: 'timetable', id: 'timetable' });
  timetableTable.appendChild(el('tbody', { id: 'timetable-body' }));
  timetableSection.appendChild(timetableTable);

  const calendarSection = el('div', { className: 'schedule-section', id: 'calendar-section' });
  calendarSection.appendChild(el('button', { id: 'add-calendar-event', type: 'button', text: 'Add Event' }));
  calendarSection.appendChild(el('div', { id: 'calendar-container' }));

  scheduleContainer.appendChild(myTimetableSection);
  scheduleContainer.appendChild(ustcSection);
  scheduleContainer.appendChild(timetableSection);
  scheduleContainer.appendChild(calendarSection);
  container.appendChild(scheduleContainer);
  schedule.appendChild(container);

  const eventModal = createModal('event-modal', 'event-modal-title', 'event-form', 'Edit Class', 'event-modal-close', 'event-cancel-btn', 'event-delete-btn', form => {
    form.appendChild(el('input', { id: 'event-id', type: 'hidden' }));
    form.appendChild(el('input', { id: 'ustc-period-start', type: 'number', value: '1' }));
    form.appendChild(el('input', { id: 'ustc-period-end', type: 'number', value: '1' }));
    form.appendChild(el('input', { id: 'ustc-course-name', type: 'text' }));
    form.appendChild(el('input', { id: 'ustc-instructor', type: 'text' }));
    form.appendChild(el('input', { id: 'ustc-location', type: 'text' }));
    form.appendChild(el('input', { id: 'ustc-credits', type: 'number', step: '0.5', min: '0' }));
    form.appendChild(createDayChecks());
    form.appendChild(createWeeksGrid());
    form.appendChild(el('div', { id: 'week-display' }));
  });

  const generalModal = createModal('general-event-modal', 'general-event-modal-title', 'general-event-form', 'Edit Event', 'general-event-modal-close', 'general-event-cancel-btn', 'general-event-delete-btn', form => {
    form.appendChild(el('input', { id: 'general-event-id', type: 'hidden' }));
    form.appendChild(el('input', { id: 'general-event-type', type: 'hidden' }));
    form.appendChild(el('input', { id: 'event-title', type: 'text' }));
    form.appendChild(el('textarea', { id: 'event-description' }));
    form.appendChild(el('input', { id: 'event-start', type: 'datetime-local' }));
    form.appendChild(el('input', { id: 'event-end', type: 'datetime-local' }));
  });

  schedule.appendChild(eventModal);
  schedule.appendChild(generalModal);
  mount.appendChild(schedule);
})();
