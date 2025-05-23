"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";

import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  PaletteIcon,
  HighlighterIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  QuoteIcon,
  CodeIcon,
  MinusIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  Loader2,
} from "lucide-react";
import { addBlog } from "@/service/MyInfo";
import { toast } from "sonner";

const BlogComponent = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [issubmit, setSubmit] = useState(false);
  // State for managing dropdown visibility for color and highlight
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showHighlightDropdown, setShowHighlightDropdown] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      ListItem,
    ],
    content: "<p>Start writing your blog...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleSubmit = async () => {
    setSubmit(true)

    if(!title || content==='<p></p>' || !imageUrl) {
      setSubmit(false)
      return toast.error('All field is reqired');
    }
    console.log(content)
    
    const blogData = {
      title: title,
      details: content,
      coverImage: imageUrl,
    };
    console.log(issubmit)

    try {
      const res = await addBlog(blogData);
      // console.log(res)
      if(res?.success) {
        toast.success('Blog added')
        setSubmit(false)
      }
      else {
        toast.error('Try Again!')
        setSubmit(false)
      }
    } catch (error) {
      setSubmit(false)
      console.log(error)
    }
    
  };
  
  if (!editor) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create New Blog Post
      </h1>

      <div className="mb-6">
        <Label htmlFor="title" className="text-lg font-medium mb-2 block">
          Blog Title
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="imageUrl" className="text-lg font-medium mb-2 block">
          Image URL
        </Label>
        <Input
          id="imageUrl"
          type="text"
          placeholder="Enter image URL for your blog (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Editor Toolbar */}
      <div className="border border-gray-300 rounded-t-md p-2 bg-gray-50 flex flex-wrap gap-x-1 gap-y-2 mb-0 justify-center sm:justify-start">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="icon"
          className="w-9 h-9"
        >
          <BoldIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="icon"
          className="w-9 h-9"
        >
          <ItalicIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "default" : "outline"}
          size="icon"
          className="w-9 h-9"
        >
          <span className="font-bold">U</span>
        </Button>

        {/* Separator (using a simple div for visual separation) */}
        <div className="w-[1px] h-9 bg-gray-300 mx-1"></div>

        {/* Highlight */}
        <div className="relative">
          <Button
            type="button"
            onClick={() => setShowHighlightDropdown(!showHighlightDropdown)}
            variant={editor.isActive("highlight") ? "default" : "outline"}
            size="icon"
            className="w-9 h-9"
          >
            <HighlighterIcon className="h-4 w-4" />
          </Button>
          {showHighlightDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 flex gap-1 z-10">
              <Button
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#ffc107" })
                    .run();
                  setShowHighlightDropdown(false);
                }}
                style={{ backgroundColor: "#ffc107" }}
                className="w-8 h-8 rounded-full p-0"
              ></Button>
              <Button
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#a8dadc" })
                    .run();
                  setShowHighlightDropdown(false);
                }}
                style={{ backgroundColor: "#a8dadc" }}
                className="w-8 h-8 rounded-full p-0"
              ></Button>
              <Button
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#f7a8b8" })
                    .run();
                  setShowHighlightDropdown(false);
                }}
                style={{ backgroundColor: "#f7a8b8" }}
                className="w-8 h-8 rounded-full p-0"
              ></Button>
              <Button
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setShowHighlightDropdown(false);
                }}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Text Color */}
        <div className="relative">
          <Button
            type="button"
            onClick={() => setShowColorDropdown(!showColorDropdown)}
            variant={editor.isActive("textStyle") ? "default" : "outline"}
            size="icon"
            className="w-9 h-9"
          >
            <PaletteIcon className="h-4 w-4" />
          </Button>
          {showColorDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 flex gap-1 z-10">
              <Button
                onClick={() => {
                  editor.chain().focus().setColor("#ef4444").run();
                  setShowColorDropdown(false);
                }}
                style={{ backgroundColor: "#ef4444" }}
                className="w-8 h-8 rounded-full p-0"
              ></Button>
              <Button
                onClick={() => {
                  editor.chain().focus().setColor("#22c55e").run();
                  setShowColorDropdown(false);
                }}
                style={{ backgroundColor: "#22c55e" }}
                className="w-8 h-8 rounded-full p-0"
              ></Button>
              <Button
                onClick={() => {
                  editor.chain().focus().setColor("#3b82f6").run();
                  setShowColorDropdown(false);
                }}
                style={{ backgroundColor: "#3b82f6" }}
                className="w-8 h-8 rounded-full p-0"
              ></Button>
              <Button
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setShowColorDropdown(false);
                }}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Default
              </Button>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="w-[1px] h-9 bg-gray-300 mx-1"></div>

        {/* Lists */}
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="icon"
          className="w-9 h-9"
        >
          <ListIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="icon"
          className="w-9 h-9"
        >
          <ListOrderedIcon className="h-4 w-4" />
        </Button>

        {/* Separator */}
        <div className="w-[1px] h-9 bg-gray-300 mx-1"></div>

        {/* Headings */}
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={
            editor.isActive("heading", { level: 1 }) ? "default" : "outline"
          }
          size="icon"
          className="w-9 h-9"
        >
          <Heading1Icon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          size="icon"
          className="w-9 h-9"
        >
          <Heading2Icon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "outline"
          }
          size="icon"
          className="w-9 h-9"
        >
          <Heading3Icon className="h-4 w-4" />
        </Button>

        {/* Separator */}
        <div className="w-[1px] h-9 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <Button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          variant={
            editor.isActive({ textAlign: "left" }) ? "default" : "outline"
          }
          size="icon"
          className="w-9 h-9"
        >
          <AlignLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          variant={
            editor.isActive({ textAlign: "center" }) ? "default" : "outline"
          }
          size="icon"
          className="w-9 h-9"
        >
          <AlignCenterIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          variant={
            editor.isActive({ textAlign: "right" }) ? "default" : "outline"
          }
          size="icon"
          className="w-9 h-9"
        >
          <AlignRightIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          variant={
            editor.isActive({ textAlign: "justify" }) ? "default" : "outline"
          }
          size="icon"
          className="w-9 h-9"
        >
          <AlignJustifyIcon className="h-4 w-4" />
        </Button>

        <div className="w-[1px] h-9 bg-gray-300 mx-1"></div>

        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive("codeBlock") ? "default" : "outline"}
          size="icon"
          className="w-9 h-9"
        >
          <CodeIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive("blockquote") ? "default" : "outline"}
          size="icon"
          className="w-9 h-9"
        >
          <QuoteIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant="outline"
          size="icon"
          className="w-9 h-9"
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="border border-gray-300 rounded-b-md bg-white min-h-[300px] p-4 mb-6 prose max-w-none focus-within:ring-2 focus-within:ring-red-500">
        <EditorContent editor={editor} />
      </div>

      <div className="text-center">
        <Button
          disabled={issubmit}
          onClick={handleSubmit}
          className="w-full sm:w-auto px-8 py-3  text-white rounded-md cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          {issubmit ? (<span className="flex items-center gap-2">
    <Loader2 className="animate-spin " />
    Publishing...
  </span>) : 'Publish Blog'} 
        </Button>
      </div>
    </div>
  );
};

export default BlogComponent;
