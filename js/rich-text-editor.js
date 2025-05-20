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

        // Initialize editor with default content
        this.editor.innerHTML = '<p><br></p>';
    }

    addToolbarButtons() {
        // Font family dropdown
        this.addDropdown('font-family', 'Font', [
            { value: 'Arial', label: 'Arial' },
            { value: 'Times New Roman', label: 'Times New Roman' },
            { value: 'Courier New', label: 'Courier New' },
            { value: 'Georgia', label: 'Georgia' },
            { value: 'Verdana', label: 'Verdana' }
        ], (value) => {
            document.execCommand('fontName', false, value);
            this.editor.focus();
        });

        // Font size dropdown
        this.addDropdown('font-size', 'Size', [
            { value: '1', label: 'Small' },
            { value: '2', label: 'Medium' },
            { value: '3', label: 'Normal' },
            { value: '4', label: 'Large' },
            { value: '5', label: 'Huge' }
        ], (value) => {
            document.execCommand('fontSize', false, value);
            this.editor.focus();
        });

        // Add separator
        this.addSeparator();

        // Text style buttons with icons
        this.addButton('bold', '<i data-feather="bold"></i>', () => {
            document.execCommand('bold', false, null);
            this.editor.focus();
        }, 'Bold');

        this.addButton('italic', '<i data-feather="italic"></i>', () => {
            document.execCommand('italic', false, null);
            this.editor.focus();
        }, 'Italic');

        this.addButton('underline', '<i data-feather="underline"></i>', () => {
            document.execCommand('underline', false, null);
            this.editor.focus();
        }, 'Underline');

        this.addButton('strike', '<i data-feather="strikethrough"></i>', () => {
            document.execCommand('strikeThrough', false, null);
            this.editor.focus();
        }, 'Strikethrough');

        // Add separator
        this.addSeparator();

        // Text alignment buttons
        this.addButton('align-left', '<i data-feather="align-left"></i>', () => {
            document.execCommand('justifyLeft', false, null);
            this.editor.focus();
        }, 'Align Left');

        this.addButton('align-center', '<i data-feather="align-center"></i>', () => {
            document.execCommand('justifyCenter', false, null);
            this.editor.focus();
        }, 'Align Center');

        this.addButton('align-right', '<i data-feather="align-right"></i>', () => {
            document.execCommand('justifyRight', false, null);
            this.editor.focus();
        }, 'Align Right');

        // Add separator
        this.addSeparator();

        // Color picker
        this.addColorPicker();

        // Initialize Feather icons in toolbar
        if (window.feather) {
            feather.replace();
        }
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

    addButton(id, icon, onClick, title) {
        const button = document.createElement('button');
        button.className = 'p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary';
        button.innerHTML = icon;
        button.title = title;
        button.addEventListener('click', onClick);
        this.toolbar.appendChild(button);
    }

    addSeparator() {
        const separator = document.createElement('div');
        separator.className = 'w-px h-6 bg-gray-200 mx-1';
        this.toolbar.appendChild(separator);
    }

    addColorPicker() {
        const container = document.createElement('div');
        container.className = 'relative';

        const input = document.createElement('input');
        input.type = 'color';
        input.className = 'w-8 h-8 p-1 border border-gray-200 rounded cursor-pointer';
        input.title = 'Text Color';
        input.addEventListener('change', (e) => {
            document.execCommand('foreColor', false, e.target.value);
            this.editor.focus();
        });

        container.appendChild(input);
        this.toolbar.appendChild(container);
    }

    getContent() {
        return this.editor.innerHTML;
    }

    setContent(content) {
        this.editor.innerHTML = content;
    }

    clear() {
        this.editor.innerHTML = '<p><br></p>';
    }
}

// Export the editor
window.RichTextEditor = RichTextEditor; 