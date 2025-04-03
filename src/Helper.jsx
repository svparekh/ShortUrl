export function createOption({ value, text, disabled = false, icon }) {
    if (!value) {
        throw new Error('Value is required');
    }
    if (!text) {
        throw new Error('Text is required');
    }
    return {
        'value': value,
        'text': text,
        'disabled': disabled,
        'icon': icon
    };
}