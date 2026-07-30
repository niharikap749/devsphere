import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";

import { useConversation } from "../../context/ConversationContext";

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: MessageSquare,
    label: "DevSphere AI",
    path: "/ai",
  },
];

export default function Sidebar() {
  const {
    conversations,
    currentConversation,
    createConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
  } = useConversation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  function saveRename(id: string) {
    renameConversation(id, editingTitle);
    setEditingId(null);
    setEditingTitle("");
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          🚀 DevSphere
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          AI Developer Workspace
        </p>
      </div>

      {/* Navigation */}
      <div className="border-b border-zinc-800 p-4">
        <div className="space-y-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-3 transition ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={createConversation}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="mb-3 px-2 text-xs uppercase tracking-wider text-zinc-500">
          Conversations
        </p>

        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center rounded-lg transition ${
                currentConversation?.id === conversation.id
                  ? "bg-zinc-800"
                  : "hover:bg-zinc-900"
              }`}
            >
              <button
                onClick={() => selectConversation(conversation.id)}
                className="flex flex-1 items-center gap-3 px-3 py-3 text-left"
              >
                <MessageSquare
                  size={18}
                  className="text-zinc-400"
                />

                {editingId === conversation.id ? (
                  <input
                    autoFocus
                    value={editingTitle}
                    onChange={(e) =>
                      setEditingTitle(e.target.value)
                    }
                    onBlur={() => saveRename(conversation.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveRename(conversation.id);
                      }

                      if (e.key === "Escape") {
                        setEditingId(null);
                        setEditingTitle("");
                      }
                    }}
                    className="w-full rounded bg-zinc-700 px-2 py-1 text-sm text-white outline-none"
                  />
                ) : (
                  <span
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingId(conversation.id);
                      setEditingTitle(conversation.title);
                    }}
                    className="truncate text-sm text-white"
                  >
                    {conversation.title}
                  </span>
                )}
              </button>

              <button
                onClick={() =>
                  deleteConversation(conversation.id)
                }
                className="mr-2 rounded p-1 text-zinc-500 opacity-0 transition hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}