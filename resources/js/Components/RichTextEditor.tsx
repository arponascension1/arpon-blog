import React, { useState, useRef } from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import FroalaEditor from 'froala-editor';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import MediaModal from '@/Components/MediaModal';

// Define custom button for Media Picker
// We check if the command exists to avoid re-registering on hot reloads
if (!(FroalaEditor.COMMANDS as any).mediaPicker) {
    FroalaEditor.DefineIcon('mediaPicker', { NAME: 'image', SVG_KEY: 'insertImage' });
    FroalaEditor.RegisterCommand('mediaPicker', {
        title: 'Insert Media',
        focus: false,
        undo: false,
        refreshAfterCallback: false,
        callback: function () {
            // Trigger a custom event on the editor instance that the React component can listen to
            this.events.trigger('openMediaPicker', [], true);
        }
    });
}

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write something...' }: RichTextEditorProps) {
    const [showMediaModal, setShowMediaModal] = useState(false);
    const editorRef = useRef<any>(null);

    const handleMediaSelect = (url: string) => {
        if (editorRef.current) {
            // Restore focus to editor
            editorRef.current.events.focus();
            // Insert the image
            editorRef.current.image.insert(url, true, null, null, null);
        }
        setShowMediaModal(false);
    };

    const config = {
        placeholderText: placeholder,
        heightMin: 500,
        heightMax: '1000',
        imageUpload: false,
        fontFamily: {
            "Figtree, sans-serif": "Figtree (Default)",
            "Arial,Helvetica,sans-serif": "Arial",
            "Georgia,serif": "Georgia",
            "Impact,Charcoal,sans-serif": "Impact",
            "Tahoma,Geneva,sans-serif": "Tahoma",
            "Times New Roman,Times,serif": "Times New Roman",
            "Verdana,Geneva,sans-serif": "Verdana",
            "Courier New,Courier,monospace": "Courier New"
        },
        fontSize: ["8", "10", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"],
        toolbarButtons: [
            'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
            'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineStyle', 'paragraphStyle', '|',
            'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-',
            'insertLink', 'mediaPicker', 'insertVideo', 'insertTable', '|',
            'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
            'print', 'help', 'html', '|',
            'undo', 'redo', 'fullscreen'
        ],
        pluginsEnabled: [
            'align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'embedly', 'emoticons',
            'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'inlineStyle', 'link', 'lists',
            'paragraphFormat', 'paragraphStyle', 'print', 'quickInsert', 'quote', 'save', 'table', 'url', 'video',
            'wordPaste', 'specialCharacters'
        ],
        events: {
            'contentChanged': function (this: any) {
                onChange(this.html.get());
            },
            'initialized': function (this: any) {
                editorRef.current = this;
            },
            'openMediaPicker': function (this: any) {
                setShowMediaModal(true);
            }
        },
        attribution: false
    };

    return (
        <div className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
            <FroalaEditorComponent
                tag='textarea'
                config={config}
                model={value}
                onModelChange={onChange}
            />
            <style dangerouslySetInnerHTML={{
                __html: `
                .fr-box.fr-basic .fr-element {
                    min-height: 500px;
                    font-size: 1.25rem;
                    line-height: 1.8;
                    font-family: inherit;
                    color: #1f2937;
                }
                .fr-element img {
                    border-radius: 0 !important;
                }
                .fr-element a {
                    color: #2563eb !important;
                    text-decoration: underline !important;
                }
                .fr-toolbar {
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: 1px solid #f3f4f6 !important;
                    background: #f9fafb !important;
                }
                .fr-wrapper {
                    border: none !important;
                }
                .fr-second-toolbar {
                    border: none !important;
                }
            `}} />

            <MediaModal
                show={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={handleMediaSelect}
                title="Select Image"
            />
        </div>
    );
}
