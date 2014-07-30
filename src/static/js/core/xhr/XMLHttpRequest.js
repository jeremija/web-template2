/**
 * Returns a {@link external:XMLHttpRequest} or {@link external:ActiveXObject},
 * depending sson what's found.
 * @class core/xhr/XMLHttpRequest
 * @private
 */
define([], function() {

    return window.XMLHttpRequest || ActiveXObject;
});