import React, { useMemo, useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import MediaModal from '@/Components/MediaModal';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write something...' }: RichTextEditorProps) {
    const editorRef = useRef(null);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    
    // Pattern to fix jumping: Only pass the initial value to Jodit once.
    // Subsequent updates are handled internally by Jodit.
    // We only sync back to the parent on blur or image insert.
    const [initialValue] = useState(value);
    const lastContent = useRef(value);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder,
        height: 600,
        minHeight: 600,
        scrollMode: 'inside',
        toolbarSticky: false,
        toolbarAdaptive: false,
        autofocus: false,
        spellcheck: true,
        theme: 'default',
        buttons: [
            'source', '|',
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'ul', 'ol', '|',
            'outdent', 'indent', '|',
            'font', 'fontsize', 'brush', 'paragraph', '|',
            {
                name: 'media',
                tooltip: 'Insert from Media Library',
                iconURL: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgcnk9IjIiLz48Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEuNSIvPjxwb2x5bGluZSBwb2ludHM9IjIxIDE1IDE2IDEwIDUgMjEiLz48L3N2Zz4=',
                exec: (editor: any) => {
                    setMediaModalOpen(true);
                }
            },
            'table', 'link', '|',
            'align', 'undo', 'redo', '|',
            'hr', 'eraser', 'copyformat', '|',
            'fullsize', 'print', 'about'
        ],
        removeButtons: ['image', 'file', 'video'],
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: 'insert_clear_html',
    } as any), [placeholder]);

    const handleMediaSelect = (url: string) => {
        if (editorRef.current) {
            const editor = (editorRef.current as any);
            editor.selection.insertImage(url);
            const newContent = editor.value;
            lastContent.current = newContent;
            onChange(newContent);
        }
    };

    const handleBlur = (newContent: string) => {
        if (newContent !== lastContent.current) {
            lastContent.current = newContent;
            onChange(newContent);
        }
    };

    return (
        <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white jodit-editor-container min-h-[600px]">
            <MediaModal 
                show={mediaModalOpen} 
                onClose={() => setMediaModalOpen(false)} 
                onSelect={handleMediaSelect} 
                title="Insert Image from Media Library"
            />
            
            <JoditEditor
                ref={editorRef}
                value={initialValue}
                config={config}
                onBlur={handleBlur}
                onChange={() => {}} 
            />
            <style dangerouslySetInnerHTML={{ __html: `
                .jodit-editor-container .jodit-container:not(.jodit_fullsize) { border: none !important; height: 600px !important; }
                .jodit-editor-container .jodit-container:not(.jodit_fullsize) .jodit-workplace { height: 560px !important; overflow-y: auto !important; }
                .jodit-editor-container .jodit-wysiwyg { padding: 2rem !important; }
            `}} />
        </div>
    );
}
