# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A **GNOME Shell** extension that binds direct hotkeys (default `Shift + Alt + 1..0`) to switch the active keyboard input layout, rather than cycling through layouts one at a time. Supports up to 10 layouts.

## Commands

- **Lint:** `ESLINT_USE_FLAT_CONFIG=false npx eslint src/` — the project uses a legacy `.eslintrc.yml` (which extends the GJS/GNOME Shell rule sets in `lint/`), so the env var is required for ESLint 9 to read it. There is no `lint` npm script.
- **Install locally:** `./install.sh` — copies `src/*` into `~/.local/share/gnome-shell/extensions/<uuid>` and compiles the GSettings schema with `glib-compile-schemas`. Refuses to run as root and refuses to overwrite an existing install. Requires `jq`.
- **Activate after install:** re-log into GNOME Shell, then enable "Layout Hotkeys" in the Extensions app. There is no automated test suite or build step.

## Architecture

Everything that ships lives in `src/` (this is the directory `install.sh` deploys):

- `src/extension.js` — the entire extension. `enable()` registers one keybinding per hotkey via `Main.wm.addKeybinding`; `disable()` removes them. Layout switching uses `getInputSourceManager().inputSources[id].activate()` from GNOME Shell's `status/keyboard.js`.
- `src/schemas/org.gnome.shell.extensions.layout-hotkeys.gschema.xml` — defines the 10 `switch-to-layout-N` keybinding keys and their default accelerators. Note the 10th layout binds to `<Shift><Alt>0`.
- `src/metadata.json` — extension manifest: `uuid`, supported `shell-version`, and the `settings-schema` id. **This file is the source of truth for the supported GNOME version** and must be kept in sync with the schema and code.

Key coupling to keep consistent when changing the number of hotkeys: the `NUM_HOTKEYS` constant in `extension.js`, the `switch-to-layout-N` keys in the gschema XML, and the `id + 1` naming in `_foreachLayoutHotkey`. The schema key name `switch-to-layout-${id + 1}` is what links a settings key to an input-source index.

## GNOME version updates

The recurring maintenance task (see git history) is bumping to a new GNOME Shell release: update `shell-version` and `version-name` in `src/metadata.json`, verify the imports from `resource:///org/gnome/shell/...` still resolve in the new Shell, and confirm `getInputSourceManager`/`inputSources` APIs are unchanged.
