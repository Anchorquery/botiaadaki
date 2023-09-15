<template>
  <div>
    <nav-bar-file></nav-bar-file>
    <b-container class="mt-3">
      <div>
        <b-row>
          <b-col cols="12">
            <div class="document-editor">
              <div class="document-editor__toolbar"></div>
              <div class="document-editor__editable-container">
                <div class="document-editor__editable">
                  <ckeditor
                    :editor="editor.build"
                    v-model="editor.editorData"
                    :config="editor.editorConfig"
                    @ready="onReady"
                  ></ckeditor>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import NavBarFile from "@/components/Common/NavBarFile";

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline
} from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { CKBox } from "@ckeditor/ckeditor5-ckbox";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { ExportPdf } from "@ckeditor/ckeditor5-export-pdf";
import { ExportWord } from "@ckeditor/ckeditor5-export-word";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { Font } from "@ckeditor/ckeditor5-font";
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line";
import { HtmlEmbed } from "@ckeditor/ckeditor5-html-embed";
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing
} from "@ckeditor/ckeditor5-image";
import { ImportWord } from "@ckeditor/ckeditor5-import-word";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { AutoLink, Link, LinkImage } from "@ckeditor/ckeditor5-link";
import { DocumentList, DocumentListProperties } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { PageBreak } from "@ckeditor/ckeditor5-page-break";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { ShowBlocks } from "@ckeditor/ckeditor5-show-blocks";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import {
  SpecialCharacters,
  SpecialCharactersEssentials
} from "@ckeditor/ckeditor5-special-characters";
import { Style } from "@ckeditor/ckeditor5-style";
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar
} from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { WordCount } from "@ckeditor/ckeditor5-word-count";
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import {mapGetters} from "vuex";
export default {
  components: {
    "nav-bar-file": NavBarFile
  },

  data() {
			 let id = this.$route.params.uuid;
    return {
      items: [],
      id: null,
      editor: {
        build: ClassicEditor,
        editorData: "",
        editorConfig: {
          plugins: [
            Autoformat,
            BlockQuote,
            Bold,
            Heading,
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            Indent,
            Italic,
            Link,
            DocumentList,
            MediaEmbed,
            Paragraph,
            Table,
            TableToolbar,
            Alignment,
            AutoImage,
            AutoLink,
            CKBox,
            CloudServices,
            Code,
            CodeBlock,
            Essentials,
            ExportPdf,
            ExportWord,
            ImportWord,
            FindAndReplace,
            Font,
            Highlight,
            HorizontalLine,
            HtmlEmbed,
            ImageInsert,
            ImageResize,
            ImageUpload,
            IndentBlock,
            GeneralHtmlSupport,
            LinkImage,
            DocumentListProperties,
            Mention,
            PageBreak,
            PasteFromOffice,
            PictureEditing,
            RemoveFormat,
            ShowBlocks,
            SourceEditing,
            SpecialCharacters,
            SpecialCharactersEssentials,
            Style,
            Strikethrough,
            Subscript,
            Superscript,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TextTransformation,
            Underline,
            WordCount,
            Autosave
          ],
          autosave: {
            waitingTime: 5000,
            async save(editor) {
              await axios.put(`/document-files/${id}`, {
                data: {
                  content: editor.getData(),
									title: localStorage.getItem("fileName"),
                  words : editor.plugins.get( 'WordCount' ).words

                }
              });
            }
          },
          placeholder: "Ingresa el contenido del documento",
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "exportPdf",
              "exportWord",
              "importWord",
              "|",
              "showBlocks",
              "formatPainter",
              "findAndReplace",
              "selectAll",
              "wproofreader",
              "|",
              "heading",
              "|",
              "style",
              "|",
              "fontSize",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "-",
              "bold",
              "italic",
              "underline",
              {
                label: "Formatting",
                icon: "text",
                items: [
                  "strikethrough",
                  "subscript",
                  "superscript",
                  "code",
                  "|",
                  "removeFormat"
                ]
              },
              "|",
              "specialCharacters",
              "horizontalLine",
              "pageBreak",
              "|",
              "link",
              "insertImage",
              "ckbox",
              "insertTable",
              "tableOfContents",
              "insertTemplate",
              {
                label: "Insert",
                icon: "plus",
                items: [
                  "highlight",
                  "blockQuote",
                  "mediaEmbed",
                  "codeBlock",
                  "htmlEmbed"
                ]
              },
              "|",
              "alignment",
              "|",
              "bulletedList",
              "numberedList",
              "outdent",
              "indent",
              "|",
              "sourceEditing"
            ],
            shouldNotGroupWhenFull: true
          }
        }
      }
    };
  },
  async created() {
    this.id = this.$route.params.uuid;
    await this.getItem();
  },
  methods: {
    async getItem() {
      try {
        const { data } = await axios.get(`/document-files/${this.id}`);
        this.editor.editorData = data.content;
								this.$store.commit("setFileName", data.title);
      } catch (error) {
        console.log(error);
      }
    },
    crearCarpeta() {
      console.log("crear carpeta");
    },
    async onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
  },
		computed: {
				...mapGetters({
						title: "getFileName",
            "getAddTextDocument" : "getAddTextDocument"
				})
		},

  watch: {
    getAddTextDocument: function(val) {
      if (val != "") {
        // introduzco una linea y luego el texto
        if(this.editor.editorData != ""){
          this.editor.editorData += "\n";
        }
        

        this.editor.editorData += val;
        
      }
    }
  }
};
</script>

<style>
.ck-editor__editable_inline:not(.ck-comment__input *) {
  height: 450px;
  overflow-y: auto;
}
/*.document-editor {
  border: 1px solid var(--ck-color-base-border);
  border-radius: var(--ck-border-radius);

  max-height: 700px;

  display: flex;
  flex-flow: column nowrap;
}

.document-editor__toolbar {
  z-index: 1;

  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);

  border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.document-editor__toolbar .ck-toolbar {
  border: 0;
  border-radius: 0;
}

.document-editor__editable-container {
  padding: calc(2 * var(--ck-spacing-large));
  background: var(--ck-color-base-foreground);

  overflow-y: scroll;
}*/

.document-editor__editable-container
  .document-editor__editable.ck-editor__editable {
  /* Set the dimensions of the "page". */
  width: 15.8cm;
  min-height: 21cm;

  /* Keep the "page" off the boundaries of the container. */
  padding: 1cm 2cm 2cm;

  border: 1px hsl(0, 0%, 82.7%) solid;
  border-radius: var(--ck-border-radius);
  background: white;

  /* The "page" should cast a slight shadow (3D illusion). */
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);

  /* Center the "page". */
  margin: 0 auto;
}

/* Override the page's width in the "Examples" section which is wider. */
.main__content-wide
  .document-editor__editable-container
  .document-editor__editable.ck-editor__editable {
  width: 18cm;
}

/* Set the default font for the "page" of the content. */
.document-editor .ck-content,
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  font: 16px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;
}

/* Adjust the headings dropdown to host some larger heading styles. */
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  line-height: calc(
    1.7 * var(--ck-line-height-base) * var(--ck-font-size-base)
  );
  min-width: 6em;
}

/* Scale down all heading previews because they are way too big to be presented in the UI.
	Preserve the relative scale, though. */
.document-editor
  .ck-heading-dropdown
  .ck-list
  .ck-heading_heading1
  .ck-button__label,
.document-editor
  .ck-heading-dropdown
  .ck-list
  .ck-heading_heading2
  .ck-button__label {
  transform: scale(0.8);
  transform-origin: left;
}

/* Set the styles for "Heading 1". */
.document-editor .ck-content h2,
.document-editor .ck-heading-dropdown .ck-heading_heading1 .ck-button__label {
  font-size: 2.18em;
  font-weight: normal;
}

.document-editor .ck-content h2 {
  line-height: 1.37em;
  padding-top: 0.342em;
  margin-bottom: 0.142em;
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3,
.document-editor .ck-heading-dropdown .ck-heading_heading2 .ck-button__label {
  font-size: 1.75em;
  font-weight: normal;
  color: hsl(203, 100%, 50%);
}

.document-editor
  .ck-heading-dropdown
  .ck-heading_heading2.ck-on
  .ck-button__label {
  color: var(--ck-color-list-button-on-text);
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3 {
  line-height: 1.86em;
  padding-top: 0.171em;
  margin-bottom: 0.357em;
}

/* Set the styles for "Heading 3". */
.document-editor .ck-content h4,
.document-editor .ck-heading-dropdown .ck-heading_heading3 .ck-button__label {
  font-size: 1.31em;
  font-weight: bold;
}

.document-editor .ck-content h4 {
  line-height: 1.24em;
  padding-top: 0.286em;
  margin-bottom: 0.952em;
}

/* Make the block quoted text serif with some additional spacing. */
.document-editor .ck-content blockquote {
  font-family: Georgia, serif;
  margin-left: calc(2 * var(--ck-spacing-large));
  margin-right: calc(2 * var(--ck-spacing-large));
}

@media only screen and (max-width: 960px) {
  /* Because on mobile 2cm paddings are to big. */
  .document-editor__editable-container
    .document-editor__editable.ck-editor__editable {
    padding: 1.5em;
  }
}

@media only screen and (max-width: 1200px) {
  .main__content-wide
    .document-editor__editable-container
    .document-editor__editable.ck-editor__editable {
    width: 100%;
  }
}

/* Style document editor a'ka Google Docs.*/
@media only screen and (min-width: 1360px) {
  .main .main__content.main__content-wide {
    padding-right: 0;
  }
}

@media only screen and (min-width: 1600px) {
  .main .main__content.main__content-wide {
    width: 24cm;
  }

  .main .main__content.main__content-wide .main__content-inner {
    width: auto;
    margin: 0 50px;
  }

  /* Keep "page" look based on viewport width. */
  .main__content-wide
    .document-editor__editable-container
    .document-editor__editable.ck-editor__editable {
    width: 60%;
  }
}
</style>
