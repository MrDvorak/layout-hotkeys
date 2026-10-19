// SPDX-License-Identifier: MIT OR LGPL-2.1-or-later
// SPDX-FileCopyrightText: 2018 Claudio André <claudioandre.br@gmail.com>
// Vendored from https://gitlab.gnome.org/World/javascript/eslint-config-gnome (c479d059)

import jsdoc from 'eslint-plugin-jsdoc';
import {defineConfig} from 'eslint/config';

const config = defineConfig({
    name: 'gnome/jsdoc',
    plugins: {
        jsdoc,
    },
    rules: {
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-param-names': 'error',
        'jsdoc/check-tag-names': 'error',
        'jsdoc/check-types': 'error',
        'jsdoc/implements-on-classes': 'error',
        'jsdoc/tag-lines': [
            'error',
            'always',
            {
                count: 0,
                startLines: 1,
            },
        ],
        'jsdoc/require-jsdoc': 'error',
        'jsdoc/require-param': 'error',
        'jsdoc/require-param-description': 'error',
        'jsdoc/require-param-name': 'error',
        'jsdoc/require-param-type': 'error',
    },
    settings: {
        jsdoc: {mode: 'typescript'},
    },
});
export default config;
