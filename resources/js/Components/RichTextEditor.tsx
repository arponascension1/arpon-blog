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
        image: {
            useClasses: false,
            editSrc: false,
            editTitle: false,
            editAlt: false,
        },
        align: {
            useClasses: false,
        },
        // This is the key: Force the bubble menu to use the same alignment logic as the header
        popup: {
            img: [
                'delete',
                'info',
                '|',
                'align',
                '|',
                'link',
            ]
        }
    } as any), [placeholder]);

    const handleMediaSelect = (url: string) => {
        if (editorRef.current) {
            const editor = (editorRef.current as any);
            // Insert as a standard block. Wrapping in a paragraph makes the header alignment buttons work reliably.
            // Removed 'text-align: center' to let it default to left alignment.
            editor.selection.insertHTML(`<p><img src="${url}" alt="" style="max-width: 100%; height: auto;" /></p>`);
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
                
                /* CRITICAL FIX: Ensure images in the editor always stay centered/aligned based on their parent P tag */
                /* We prevent Jodit from adding 'float' which breaks paragraph alignment */
                .jodit-wysiwyg img {
                    display: inline-block !important;
                    float: none !important;
                    vertical-align: middle;
                }
                
                /* When parent paragraph is centered, make sure image behaves */
                .jodit-wysiwyg p[style*="text-align: center"] {
                    text-align: center !important;
                }
                .jodit-wysiwyg p[style*="text-align: right"] {
                    text-align: right !important;
                }
                .jodit-wysiwyg p[style*="text-align: left"] {
                    text-align: left !important;
                }
            `}} />
        </div>
    );
}
