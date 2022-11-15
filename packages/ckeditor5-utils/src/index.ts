/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils
 */

export { default as env } from './env';
export { default as diff } from './diff';

export { default as mix } from './mix';

export {
	default as EmitterMixin,
	Emitter,
	type BaseEvent,
	type CallbackOptions,
	type GetCallback,
	type GetCallbackOptions
} from './emittermixin';

export { default as EventInfo } from './eventinfo';

export {
	default as ObservableMixin,
	Observable,
	type DecoratedMethodEvent,
	type ObservableChangeEvent,
	type ObservableSetEvent
} from './observablemixin';

export { default as CKEditorError, logError, logWarning } from './ckeditorerror';

export { default as ElementReplacer } from './elementreplacer';

export { default as count } from './count';
export { default as compareArrays } from './comparearrays';
export { default as createElement } from './dom/createelement';
export { default as Config } from './config';
export { default as DomEmitterMixin } from './dom/emittermixin';
export { default as global } from './dom/global';
export { default as getDataFromElement } from './dom/getdatafromelement';
export { default as Rect } from './dom/rect';
export { default as ResizeObserver } from './dom/resizeobserver';
export { default as setDataInElement } from './dom/setdatainelement';
export { default as toUnit } from './dom/tounit';
export { default as isVisible } from './dom/isvisible';
export { type PositioningFunction } from './dom/position';
export * from './dom/scroll';

export * from './keyboard';
export * from './language';
export { default as Locale, LocaleTranslate } from './locale';
export {
	default as Collection,
	type CollectionAddEvent,
	type CollectionChangeEvent,
	type CollectionRemoveEvent
} from './collection';
export { default as first } from './first';
export { default as FocusTracker } from './focustracker';
export { default as KeystrokeHandler } from './keystrokehandler';
export { default as toArray, type ArrayOrItem, type ReadonlyArrayOrItem } from './toarray';
export { default as toMap } from './tomap';
export { default as priorities, type PriorityString } from './priorities';
export { default as insertToPriorityArray } from './inserttopriorityarray';

export { default as uid } from './uid';

export { default as version } from './version';
