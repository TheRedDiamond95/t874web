// Rich Text Editor Component
class RichTextEditor {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.editor = null;
        this.toolbar = null;
        this.initialize();
    }

    initialize() {
        // Create toolbar
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'rich-text-toolbar bg-white p-2 border-b border-gray-200 flex flex-wrap gap-2';
        
        // Create editor
        this.editor = document.createElement('div');
        this.editor.className = 'rich-text-content min-h-[200px] p-4 bg-white border border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';
        this.editor.contentEditable = true;

        // Add toolbar buttons
        this.addToolbarButtons();
        
        // Append elements
        this.container.appendChild(this.toolbar);
        this.container.appendChild(this.editor);
    }

    addToolbarButtons() {
        // Font family dropdown
        this.addDropdown('font-family', 'Font', [
            { value: 'Arial', label: 'Arial' },
            { value: 'Victor Mono', label: 'Victor Mono' },
            { value: 'Times New Roman', label: 'Times New Roman' }
        ], (value) => this.execCommand('fontName', value));

        // Font size dropdown
        this.addDropdown('font-size', 'Size', [
            { value: '1', label: 'Small' },
            { value: '3', label: 'Normal' },
            { value: '5', label: 'Large' },
            { value: '7', label: 'Huge' }
        ], (value) => this.execCommand('fontSize', value));

        // Text alignment buttons
        this.addButton('align-left', 'Left Align', 'alignLeft');
        this.addButton('align-center', 'Center', 'alignCenter');
        this.addButton('align-right', 'Right Align', 'alignRight');

        // Text style buttons
        this.addButton('bold', 'Bold', 'bold');
        this.addButton('italic', 'Italic', 'italic');
        this.addButton('underline', 'Underline', 'underline');
        this.addButton('strike', 'Strikethrough', 'strikeThrough');

        // Color picker
        this.addColorPicker();
    }

    addDropdown(id, label, options, onChange) {
        const container = document.createElement('div');
        container.className = 'relative';

        const select = document.createElement('select');
        select.className = 'appearance-none bg-white border border-gray-200 rounded px-2 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';
        select.id = id;

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = label;
        select.appendChild(defaultOption);

        // Add options
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            select.appendChild(opt);
        });

        // Add event listener
        select.addEventListener('change', (e) => onChange(e.target.value));

        container.appendChild(select);
        this.toolbar.appendChild(container);
    }

    addButton(id, label, command) {
        const button = document.createElement('button');
        button.className = 'p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary';
        button.innerHTML = `<i data-feather="${id}"></i>`;
        button.title = label;
        button.addEventListener('click', () => this.execCommand(command));
        this.toolbar.appendChild(button);
    }

    addColorPicker() {
        const container = document.createElement('div');
        container.className = 'relative';

        const input = document.createElement('input');
        input.type = 'color';
        input.className = 'w-8 h-8 p-1 border border-gray-200 rounded cursor-pointer';
        input.title = 'Text Color';
        input.addEventListener('change', (e) => this.execCommand('foreColor', e.target.value));

        container.appendChild(input);
        this.toolbar.appendChild(container);
    }

    execCommand(command, value = null) {
        document.execCommand(command, false, value);
        this.editor.focus();
    }

    getContent() {
        return this.editor.innerHTML;
    }

    setContent(content) {
        this.editor.innerHTML = content;
    }

    clear() {
        this.editor.innerHTML = '';
    }
}

// Export the editor
window.RichTextEditor = RichTextEditor; 