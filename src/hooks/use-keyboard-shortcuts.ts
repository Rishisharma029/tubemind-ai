"use client";

import { useEffect } from 'react';

interface ShortcutMapping {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  callback: (e: KeyboardEvent) => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMapping[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Avoid firing shortcuts when typing in inputs or textareas
      const activeEl = document.activeElement;
      const isTyping = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.getAttribute('contenteditable') === 'true'
      );

      for (const shortcut of shortcuts) {
        // Special case: allow Cmd+K / Ctrl+K even while typing in some cases
        const isPaletteHotkey = shortcut.key.toLowerCase() === 'k' && (shortcut.ctrlKey || shortcut.metaKey);
        
        if (isTyping && !isPaletteHotkey) {
          continue;
        }

        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrlKey ? (event.ctrlKey || event.metaKey) : true;
        const metaMatch = shortcut.metaKey ? event.metaKey : true;
        const altMatch = shortcut.altKey ? event.altKey : true;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : true;

        // If defined, they must match. If undefined, we don't care
        const satisfiesCtrl = shortcut.ctrlKey === undefined || (shortcut.ctrlKey === (event.ctrlKey || event.metaKey));
        const satisfiesAlt = shortcut.altKey === undefined || (shortcut.altKey === event.altKey);
        const satisfiesShift = shortcut.shiftKey === undefined || (shortcut.shiftKey === event.shiftKey);

        if (keyMatch && satisfiesCtrl && satisfiesAlt && satisfiesShift) {
          event.preventDefault();
          shortcut.callback(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
}
