import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

import {getInputSourceManager} from 'resource:///org/gnome/shell/ui/status/keyboard.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const NUM_HOTKEYS = 10;

export default class LayoutHotkeysExtension extends Extension {
    enable() {
        this._settings = this.getSettings();

        this._foreachLayoutHotkey((hotkey, id) => {
            Main.wm.addKeybinding(
                hotkey,
                this._settings,
                Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
                Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
                this._switchToLayout.bind(this, id)
            );
        });
    }

    disable() {
        this._settings = null;

        this._foreachLayoutHotkey((hotkey, _) => {
            Main.wm.removeKeybinding(hotkey);
        });
    }

    _foreachLayoutHotkey(handler) {
        for (let id = 0; id < NUM_HOTKEYS; id++)
            handler(`switch-to-layout-${id + 1}`, id);
    }

    _switchToLayout(id) {
        const inputSources = getInputSourceManager().inputSources;
        if (id in inputSources)
            inputSources[id].activate();
    }
}
