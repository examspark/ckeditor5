/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module core/context
 */

import Config from '@ckeditor/ckeditor5-utils/src/config';
import PluginCollection from './plugincollection';
import Locale from '@ckeditor/ckeditor5-utils/src/locale';
import CKEditorError from '@ckeditor/ckeditor5-utils/src/ckeditorerror';

/**
 * @TODO
 */
export default class Context {
	/**
	 * Creates a context instance with a given configuration.
	 *
	 * Usually, not to be used directly. See the static {@link module:core/context~Context.create `create()`} method.
	 *
	 * @param {Object} [config={}] The context config.
	 */
	constructor( config ) {
		/**
		 * Holds all configurations specific to this context instance.
		 *
		 * @readonly
		 * @type {module:utils/config~Config}
		 */
		this.config = new Config( config );

		/**
		 * The plugins loaded and in use by this context instance.
		 *
		 * @readonly
		 * @type {module:core/plugincollection~PluginCollection}
		 */
		this.plugins = new PluginCollection( this );

		const languageConfig = this.config.get( 'language' ) || {};

		/**
		 * @readonly
		 * @type {module:utils/locale~Locale}
		 */
		this.locale = new Locale( {
			uiLanguage: typeof languageConfig === 'string' ? languageConfig : languageConfig.ui,
			contentLanguage: this.config.get( 'language.content' )
		} );

		/**
		 * Shorthand for {@link module:utils/locale~Locale#t}.
		 *
		 * @see module:utils/locale~Locale#t
		 * @method #t
		 */
		this.t = this.locale.t;

		/**
		 * List of editors to which this context instance is injected.
		 *
		 * @private
		 * @type {Set<module:core/editor/editor~Editor>}
		 */
		this._editors = new Set();
	}

	/**
	 * Adds a reference to the editor to which context is injected.
	 *
	 * @param {module:core/editor/editor~Editor} editor
	 * @param {Boolean} isHost Flag defines if context was created by this editor. It is used to decide if the context
	 * should be destroyed along with the editor instance.
	 */
	addEditor( editor ) {
		this._editors.add( editor );
	}

	/**
	 * Removes a reference to the editor to which context was injected.
	 *
	 * @param {module:core/editor/editor~Editor} editor
	 */
	removeEditor( editor ) {
		return this._editors.delete( editor );
	}

	/**
	 * Loads and initializes plugins specified in the config.
	 *
	 * @returns {Promise.<module:core/plugin~LoadedPlugins>} A promise which resolves
	 * once the initialization is completed providing an array of loaded plugins.
	 */
	initPlugins() {
		const plugins = this.config.get( 'plugins' ) || [];

		for ( const Plugin of plugins ) {
			if ( typeof Plugin != 'function' ) {
				throw new CKEditorError( 'context-initplugins: Only constructor is allowed as a Context plugin.', null, { Plugin } );
			}

			if ( Plugin.isContextPlugin !== true ) {
				throw new CKEditorError( 'context-initplugins: Only plugins marked as a ContextPlugin are allowed.', null, { Plugin } );
			}
		}

		return this.plugins.init( plugins );
	}

	/**
	 * Destroys the context instance, releasing all resources used by it.
	 *
	 * @returns {Promise} A promise that resolves once the context instance is fully destroyed.
	 */
	destroy() {
		return Promise.all( Array.from( this._editors, editor => editor.destroy() ) )
			.then( () => this.plugins.destroy() );
	}

	/**
	 * @TODO
	 *
	 * @param {Object} [config] The context config.
	 * @returns {Promise} A promise resolved once the context is ready. The promise resolves with the created context instance.
	 */
	static create( config ) {
		return new Promise( resolve => {
			const context = new this( config );

			resolve( context.initPlugins().then( () => context ) );
		} );
	}
}
