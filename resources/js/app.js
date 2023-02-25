import './bootstrap';

import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

window.setupEditor = function (content) {
    let editor

    return {
        content: content,

        init(element) {
            editor = new Editor({
                element: element,
                extensions: [
                    StarterKit,
                ],
                content: this.content,
                onUpdate: ({ editor }) => {
                    this.content = editor.getHTML()
                }
            })

            this.$watch('content', (content) => {
                // 新しいコンテンツが TipTap のものと一致する場合はスキップします。
                if (content === editor.getHTML()) return

                /*
                  Otherwise, it means that a force external to TipTap
                  is modifying the data on this Alpine component,
                  which could be Livewire itself.
                  In this case, we just need to update TipTap's
                  content and we're good to do.
                  For more information on the `setContent()` method, see:
                    https://www.tiptap.dev/api/commands/set-content

                    それ以外の場合は、TipTap の外部の力がこの Alpine コンポーネントの
                    データを変更していることを意味します。この Alpine コンポーネントは
                    Livewire 自体である可能性があります。この場合、TipTap のコンテンツを
                    更新するだけで十分です。 setContent() メソッドについては、
                    https://www.tiptap.dev/api/commands/set-content を参照してください。
                */
                editor.commands.setContent(content, false)
            })
        }
    }
}

window.Alpine = Alpine;

Alpine.plugin(focus);

Alpine.start();
